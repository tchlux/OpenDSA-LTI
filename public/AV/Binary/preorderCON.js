/*global ODSA */
"use strict";
// Remove slideshow
$(document).ready(function () {

  function preorder(node) {
    //check if null
    if (typeof node === 'undefined') {
      rt1.arrow.hide();
      av.umsg(interpret("av_isnull"));
      pseudo.setCurrentLine("checknull");
      av.step();
      return;
    }

    //not null
    rt1.target(node, {anchor: "left top"});
    av.umsg(interpret("av_isnotnull"));
    pseudo.setCurrentLine("checknull");
    av.step();

    //visit
    rt1.target(node, {anchor: "left top"});
    node.removeClass("processing");
    node.addClass("thicknode");
    av.umsg(interpret("av_visit") + node.value() + ".");
    pseudo.setCurrentLine("visit");
    btLeft += 35;
    av.label("" + node.value(), {left: btLeft, top: 400}).show();
    av.step();

    //left
    rt1.target(node.left(), {anchor: "left top"});
    av.umsg(interpret("av_leftchild"));
    pseudo.setCurrentLine("visitleft");
    node.addClass("processing");
    av.step();
    preorder(node.left());
    
    //right child
    rt1.target(node, {anchor: "left top"});
    av.umsg(interpret("av_rightchild"));
    pseudo.setCurrentLine("visitright");
    node.addClass("thicknode");
    av.step();
    preorder(node.right());

    //finish
    rt1.target(node, {anchor: "left top"});
    node.removeClass("processing");
    av.umsg(interpret("av_done") + node.value() + ".");
    pseudo.setCurrentLine("end");
    av.step();
  }

  var av_name = "preorderCON";
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code);

  var bt = av.ds.binarytree({visible: true, nodegap: 15});
  bt.root("A");
  var rt = bt.root();
  rt.left("B");
  rt.left().right("D");
  rt.right("C");
  rt.right().left("E");
  rt.right().left().left("G");
  rt.right().right("F");
  rt.right().right().left("H");
  rt.right().right().right("I");
  bt.layout();

  var rt1 = av.pointer("rt", bt.root(), {anchor: "left top", top: -10});
  var btLeft =  250;
  
  av.umsg(interpret("av_preorder"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  preorder(rt);

  av.recorded();
});
