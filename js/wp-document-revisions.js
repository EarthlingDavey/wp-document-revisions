=(function(){var a,b=function(a,b){return function(){return a.apply(b,arguments)}};a=function(){function a(a){this.updateTimestamps=b(this.updateTimestamps,this),this.postAutosaveCallback=b(this.postAutosaveCallback,this),this.overrideLock=b(this.overrideLock,this),this.restoreRevision=b(this.restoreRevision,this),this.enableSubmit=b(this.enableSubmit,this),this.autosaveEnableButtons=b(this.autosaveEnableButtons,this),this.hijackAutosave=b(this.hijackAutosave,this),this.cookieFalse=b(this.cookieFalse,this),this.cookieTrue=b(this.cookieTrue,this),this.cookieDelete=b(this.cookieDelete,this),this.buildContent=b(this.buildContent,this),this.checkUpdate=b(this.checkUpdate,this),this.$=a,this.$(".revision").click(this.restoreRevision),this.$("#override_link").click(this.overrideLock),this.$("#document a").click(this.requestPermission),this.$(document).bind("autosaveComplete",this.postAutosaveCallback),this.$(document).bind("documentUpload",this.legacyPostDocumentUpload),this.$(":button, :submit","#submitpost").prop("disabled",!0),this.$("#misc-publishing-actions a").click(this.enableSubmit),this.$("input, select").on("change",this.enableSubmit),this.$("input[type=text], textarea").on("keyup",this.enableSubmit),this.$("#content-add_media").click(this.cookieFalse),this.$("#postimagediv .inside").click(this.cookieTrue),this.$("#publishing-action").click(this.buildContent),this.$("#submitdiv .inside").click(this.cookieDelete),this.$("#adminmenumain").click(this.cookieDelete),this.$("#wpadminbar").click(this.cookieDelete),this.$("#document").show(),this.$("#revision-log").show(),this.$("#revision-summary").hide(),this.bindPostDocumentUploadCB(),this.hijackAutosave(),this.checkUpdate(),setInterval(this.updateTimestamps,6e4),setInterval(this.checkUpdate,1500)}return a.prototype.hasUpload=!1,a.prototype.secure="https:"===window.location.protocol,a.prototype.window=window.dialogArguments||opener||parent||top,a.prototype.hijackAutosave=function(){return this.autosaveEnableButtonsOriginal=window.autosave_enable_buttons,window.autosave_enable_buttons=this.autosaveEnableButtons},a.prototype.autosaveEnableButtons=function(){if(this.window.document.$(document).trigger("autosaveComplete"),this.hasUpload)return this.autosaveEnableButtonsOriginal()},a.prototype.enableSubmit=function(){return this.$("#revision-summary").show(),this.$(":button, :submit","#submitpost").removeAttr("disabled"),this.$("#lock_override").prev().fadeIn()},a.prototype.restoreRevision=function(a){if(a.preventDefault(),confirm(wp_document_revisions.restoreConfirmation))return window.location.href=this.$(a.target).attr("href")},a.prototype.overrideLock=function(){return this.$.post(ajaxurl,{action:"override_lock",post_id:this.$("#post_ID").val()||0,nonce:wp_document_revisions.nonce},function(a){return a?(this.$("#lock_override").hide(),this.$(".error").not("#lock-notice").hide(),this.$("#publish, .add_media, #lock-notice").fadeIn(),autosave()):alert(wp_document_revisions.lockError)})},a.prototype.requestPermission=function(){if(null!=window.webkitNotifications)return window.webkitNotifications.requestPermission()},a.prototype.lockOverrideNotice=function(a){return 0<window.webkitNotifications.checkPermission()?window.webkitNotifications.RequestPermission(lock_override_notice):window.webkitNotifications.createNotification(wp_document_revisions.lostLockNoticeLogo,wp_document_revisions.lostLockNoticeTitle,a).show()},a.prototype.postAutosaveCallback=function(){if(0<this.$("#autosave-alert").length&&0<this.$("#lock-notice").length&&this.$("#lock-notice").is(":visible"))return wp_document_revisions.lostLockNotice=wp_document_revisions.lostLockNotice.replace("%s",this.window.document.$("#title").val()),window.webkitNotifications?lock_override_notice(wp_document_revisions.lostLockNotice):alert(wp_document_revisions.lostLockNotice),location.reload(!0)},a.prototype.legacyPostDocumentUpload=function(a,b){return this.postDocumentUpload(a,b)},a.prototype.human_time_diff=function(a,b){var c,e,f,g,h;return(c=new Date,b=b||c.getTime()/1e3+parseInt(wp_document_revisions.offset),f=Math.abs(b-a),3600>=f)?(h=Math.floor(f/60),h=this.roundUp(h),1===h?wp_document_revisions.minute.replace("%d",h):wp_document_revisions.minutes.replace("%d",h)):86400>=f&&3600<f?(g=Math.floor(f/3600),g=this.roundUp(g),1===g?wp_document_revisions.hour.replace("%d",g):wp_document_revisions.hours.replace("%d",g)):86400<=f?(e=Math.floor(f/86400),e=this.roundUp(e),1===e?wp_document_revisions.day.replace("%d",e):wp_document_revisions.days.replace("%d",e)):void 0},a.prototype.roundUp=function(a){return 1>a&&(a=1),a},a.prototype.bindPostDocumentUploadCB=function(){return"undefined"==typeof uploader||null===uploader?void 0:uploader.bind("FileUploaded",function(a){return function(b,c,d){return d.response.match("media-upload-error")?void 0:a.postDocumentUpload(c.name,d.response)}}(this))},a.prototype.cookieFalse=function(){wpCookies.set("doc_image","false",86400,!1,!1,this.secure)},a.prototype.cookieTrue=function(){wpCookies.set("doc_image","true",86400,!1,!1,this.secure),this.$(":button, :submit","#submitpost").removeAttr("disabled")},a.prototype.cookieDelete=function(){wpCookies.set("doc_image","true",-1,!1,!1,this.secure)},a.prototype.updateTimestamps=function(){return this.$(".timestamp").each(function(a){return function(){return a.$(a).text(a.human_time_diff(a.$(a).attr("id")))}}(this))},a.prototype.getDescr=function(){var a=this.window.document.getElementById("content_ifr");if(null===a){var b=this.$("#post_content").val();return void 0===b||""===b||/^\d+$/.test(b)?"":b}var c=a.contentWindow.document.getElementById("tinymce").innerHTML;if(void 0===c){var b=this.$("#post_content").val();return""===b||/^\d+$/.test(b)?"":b}return c=c.replace(/<br data-mce-bogus=\"1\">/g,""),c=c.replace(/<br><\/p>/g,"</p>"),c=c.replace(/<p>\s*<\/p>/g,""),c},a.prototype.buildContent=function(){var a,b=this.$("#post_content").val(),c=this.getDescr();a=""===b?[""]:/^\d+$/.test(b)?["<!-- WPDR "+b+" -->"]:b.match("<!-- WPDR [0-9]+ -->"),c=c.replace(/<!-- WPDR [0-9]+ -->/,""),c=a[0]+c,this.window.jQuery("#curr_content").val(c),this.window.jQuery("#post_content").val(c),this.window.jQuery("#content").val(c)},a.prototype.postDocumentUpload=function(a,b){return"string"==typeof b&&-1!==b.indexOf("error")?this.$(".media-item:first").html(b):(a instanceof Object&&(a=a.name.split(".").pop()),!this.hasUpload)&&(this.window.jQuery("#post_content").val("<!-- WPDR "+b+" -->"),this.window.jQuery("#message").hide(),this.window.jQuery("#revision-summary").show(),this.window.jQuery(":button, :submit","#submitpost").removeAttr("disabled"),this.hasUpload=!0,this.window.tb_remove(),this.window.jQuery("#post").before(wp_document_revisions.postUploadNotice).prev().fadeIn().fadeOut().fadeIn(),0!==this.window.jQuery("#sample-permalink").length)?this.window.jQuery("#sample-permalink").html(this.window.jQuery("#sample-permalink").html().replace(/\<\/span>(\.[a-z0-9]{1,7})?@$/i,wp_document_revisions.extension)):void 0},a.prototype.checkUpdate=function(){var a=this.$("#curr_content").val();if(void 0!==a){var b=this.$("#post_content").val();if("Unset"===a)return this.$(":button, :submit","#submitpost").prop("disabled",!0),void this.$("#curr_content").val(b);var c=this.getDescr();(c!==a||b!==a)&&(this.buildContent(),this.enableSubmit())}},a}(),jQuery(function(b){return window.WPDocumentRevisions=new a(b)})}).call(this);
