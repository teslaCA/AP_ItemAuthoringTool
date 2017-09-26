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

/****************************************************************************************************/

  // IAT customizations
  // Lines below are IAT specific setting updates
  config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Link,Unlink,Anchor,Strike,Subscript,Superscript';

  config.toolbar_IAT =
    [
      { name: 'basicstyles', items : [ 'Bold','Italic','Underline' ] },
      { name: 'paragraph', items : [ 'NumberedList','BulletedList' ] },
      { name: 'insert', items : [ 'Table' ] },
      { name: 'mathlatex', items : [ 'Mathjax' ] },
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



  // CKEDITOR.on('instanceReady', function(evt) {
  //   var editor = evt.editor;
  //   console.log('The editor named ' + editor.name + ' is now ready');
  //
  //   editor.on('focus', function(e) {
  //     console.log('The editor named ' + e.editor.name + ' is now focused');
  //   });
  // });

  // CKEDITOR.on( 'dialogDefinition', function( ev ) {
  //   // Take the dialog name and its definition from the event data.
  //   var dialogName = ev.data.name;
  //   var dialogDefinition = ev.data.definition;
  //   // Check if the definition is from the dialog we're
  //   // interested in (the "Table" dialog).
  //   if ( dialogName == 'table' ) {
  //     // Get a reference to the "Table Info" tab.
  //     var infoTab = dialogDefinition.getContents( 'info' );
  //     var txtWidth = infoTab.get( 'txtWidth' );
  //     txtWidth['default'] = '100%';
  //   }
  // });

};
