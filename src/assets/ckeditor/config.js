/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for a single toolbar row.
	config.toolbarGroups = [
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'forms' },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'tools' },
		{ name: 'others' },
		{ name: 'about' }
	];

	// The default plugins included in the basic setup define some buttons that
	// are not needed in a basic editor. They are removed here.
	config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';

	// Dialog windows are also simplified.
	config.removeDialogTabs = 'link:advanced';

  // IAT customizations
  // Lines below are IAT specific setting updates
  config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Link,Unlink,Anchor,Strike,Subscript,Superscript';

  config.toolbar_IAT =
    [
      { name: 'basicstyles', items : [ 'Bold','Italic','Underline' ] },
      { name: 'paragraph', items : [ 'NumberedList','BulletedList' ] },
      { name: 'insert', items : [ 'Table' ] },
      { name: 'mathlatex', items : [ 'Mathjax' ] },
      { name: 'mathml', items : [ 'texzilla' ] },
      { name: 'mathpaid', items : [ 'EqnEditor' ] }
    ];

  config.toolbar_IATMATH =
    [
      { name: 'basicstyles', items : [ 'Bold','Italic','Underline' ] },
      { name: 'paragraph', items : [ 'NumberedList','BulletedList' ] },
      { name: 'insert', items : [ 'Table' ] },
      { name: 'mathlatex', items : [ 'Mathjax' ] }
    ];

  config.mathJaxClass = 'iat-math';
  config.mathJaxLib = '../assets/mathjax/MathJax.js?config=TeX-AMS_HTML';

  config.autoParagraph = false;
  config.enterMode = CKEDITOR.ENTER_BR;
  //config.allowedContent = true;
  config.entities = false;


  config.contentsCss = 'contents.css';

  CKEDITOR.filter.disabled = true;

};
