// github.com/2is10/selectionchange-polyfill

var selectionchange = (function (undefined) {

  var MAC = /^Mac/.test(navigator.platform);
  var MAC_MOVE_KEYS = [65, 66, 69, 70, 78, 80]; // A, B, E, F, P, N from support.apple.com/en-ie/HT201236
  var SELECT_ALL_MODIFIER = MAC ? 'metaKey' : 'ctrlKey';
  var RANGE_PROPS = ['startContainer', 'startOffset', 'endContainer', 'endOffset'];
  var HAS_OWN_SELECTION = {INPUT: 1, TEXTAREA: 1};

  var ranges;

  return {
    start: function (doc) {
      var d = doc || document;
      if (ranges || !hasNativeSupport(d) && (ranges = newWeakMap())) {
        if (!ranges.has(d)) {
          ranges.set(d, getSelectionRange(d));
          on(d, 'input', onInput);
          on(d, 'keydown', onKeyDown);
          on(d, 'mousedown', onMouseDown);
          on(d, 'mousemove', onMouseMove);
          on(d, 'mouseup', onMouseUp);
          on(d.defaultView, 'focus', onFocus);
        }
      }
    },
    stop: function (doc) {
      var d = doc || document;
      if (ranges && ranges.has(d)) {
        ranges['delete'](d);
        off(d, 'input', onInput);
        off(d, 'keydown', onKeyDown);
        off(d, 'mousedown', onMouseDown);
        off(d, 'mousemove', onMouseMove);
        off(d, 'mouseup', onMouseUp);
        off(d.defaultView, 'focus', onFocus);
      }
    }
  };

  function hasNativeSupport(doc) {
    var osc = doc.onselectionchange;
    if (osc !== undefined) {
      try {
        doc.onselectionchange = 0;
        return doc.onselectionchange === null;
      } catch (e) {
      } finally {
        doc.onselectionchange = osc;
      }
    }
    return false;
  }

  function newWeakMap() {
    if (typeof WeakMap !== 'undefined') {
      return new WeakMap();
    } else {
      console.error('selectionchange: WeakMap not supported');
      return null;
    }
  }

  function getSelectionRange(doc) {
    var s = doc.getSelection();
    return s.rangeCount ? s.getRangeAt(0) : null;
  }

  function on(el, eventType, handler) {
    el.addEventListener(eventType, handler, true);
  }

  function off(el, eventType, handler) {
    el.removeEventListener(eventType, handler, true);
  }

  function onInput(e) {
    if (!HAS_OWN_SELECTION[e.target.tagName]) {
      dispatchIfChanged(this, true);
    }
  }

  function onKeyDown(e) {
    var code = e.keyCode;
    if (code === 65 && e[SELECT_ALL_MODIFIER] && !e.shiftKey && !e.altKey || // Ctrl-A or Cmd-A
        code >= 35 && code <= 40 || // home, end and arrow key
        e.ctrlKey && MAC && MAC_MOVE_KEYS.indexOf(code) >= 0) {
      if (!HAS_OWN_SELECTION[e.target.tagName]) {
        setTimeout(dispatchIfChanged.bind(null, this), 0);
      }
    }
  }

  function onMouseDown(e) {
    if (e.button === 0) {
      on(this, 'mousemove', onMouseMove);
      setTimeout(dispatchIfChanged.bind(null, this), 0);
    }
  }

  function onMouseMove(e) {  // only needed while primary button is down
    if (e.buttons & 1) {
      dispatchIfChanged(this);
    } else {
      off(this, 'mousemove', onMouseMove);
    }
  }

  function onMouseUp(e) {
    if (e.button === 0) {
      setTimeout(dispatchIfChanged.bind(null, this), 0);
    } else {
      off(this, 'mousemove', onMouseMove);
    }
  }

  function onFocus() {
    setTimeout(dispatchIfChanged.bind(null, this.document), 0);
  }

  function dispatchIfChanged(doc, force) {
    var r = getSelectionRange(doc);
    if (force || !sameRange(r, ranges.get(doc))) {
      ranges.set(doc, r);
      setTimeout(doc.dispatchEvent.bind(doc, new Event('selectionchange')), 0);
    }
  }

  function sameRange(r1, r2) {
    return r1 === r2 || r1 && r2 && RANGE_PROPS.every(function (prop) {
      return r1[prop] === r2[prop];
    });
  }
})();

if (typeof module !== 'undefined') {
    // CommonJS/Node compatibility.
    module.exports = selectionchange;
}
