function inlinesearch(object, key) {
    var color = key;
    while (color[0] != "#") {
        color = object[color];
    }
    return color;
}
function hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',';
    }
    throw new Error('Bad Hex');
}
function getBase64Image(hex) {
    // создаем канвас элемент  
    var canvas = document.createElement("canvas");
    canvas.width = "100";
    canvas.height = "100";

    // Копируем изображение на канвас  
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = hex;
    ctx.fillRect(0,0,100,100);

    // Получаем data-URL отформатированную строку  
    // Firefox поддерживает PNG и JPEG.   
    var dataURL = canvas.toDataURL("image/jpg");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


function getBase64ImageById(hex) {
    return getBase64Image(hex);
}

$(document).ready(function () {


    $("#process").click(function (argument) {
        if ($("#data").val() != "") {
            var array = [];
            var string = $("#data").val().replace(/\n/g, $("#razd").val() + "line");
            string = string.replace(/:/g, "");
            string = string.replace(/;/g, "");
            //console.log(string);

            array = string.split($("#razd").val());
            array[0] = "line" + array[0];

            //console.log(JSON.stringify(array));
            var json_obj = {};

            var count = 0;
            for (var key = 0; key < array.length; key++) {

                if (array[key].substring(0, 4) == "line" && array[key].length > 5 && array[key].substring(4, array[key].length) != "//") {
                    current_stop = array[key].substring(4, array[key].length);

                    json_obj[current_stop] = "";
                    count = 1;
                }
                else if (count == 1) {
                    json_obj[current_stop] = array[key];
                    count = 0;
                }
                //else console.log('"' + array[key] + '", ');
            }
        }

        $('.exported_colour').each(function () {
            $(this).remove();
        });

        var json_raw = '{"windowBg":"#ffffff","windowFg":"#000000","windowBgOver":"#f1f1f1","windowBgRipple":"#e5e5e5","windowFgOver":"windowFg","windowSubTextFg":"#999999","windowSubTextFgOver":"#919191","windowBoldFg":"#222222","windowBoldFgOver":"#222222","windowBgActive":"#40a7e3","windowFgActive":"#ffffff","windowActiveTextFg":"#168acd","windowShadowFg":"#000000","windowShadowFgFallback":"#f1f1f1","shadowFg":"#00000018","slideFadeOutBg":"#0000003c","slideFadeOutShadowFg":"windowShadowFg","imageBg":"#000000","imageBgTransparent":"#ffffff","activeButtonBg":"windowBgActive","activeButtonBgOver":"#39a5db","activeButtonBgRipple":"#2095d0","activeButtonFg":"windowFgActive","activeButtonFgOver":"activeButtonFg","activeButtonSecondaryFg":"#cceeff","activeButtonSecondaryFgOver":"activeButtonSecondaryFg","activeLineFg":"#37a1de","activeLineFgError":"#e48383","lightButtonBg":"windowBg","lightButtonBgOver":"#e3f1fa","lightButtonBgRipple":"#c9e4f6","lightButtonFg":"windowActiveTextFg","lightButtonFgOver":"lightButtonFg","attentionButtonFg":"#d14e4e","attentionButtonFgOver":"#d14e4e","attentionButtonBgOver":"#fcdfde","attentionButtonBgRipple":"#f4c3c2","outlineButtonBg":"windowBg","outlineButtonBgOver":"lightButtonBgOver","outlineButtonOutlineFg":"windowBgActive","outlineButtonBgRipple":"lightButtonBgRipple","menuBg":"windowBg","menuBgOver":"windowBgOver","menuBgRipple":"windowBgRipple","menuIconFg":"#a8a8a8","menuIconFgOver":"#999999","menuSubmenuArrowFg":"#373737","menuFgDisabled":"#cccccc","menuSeparatorFg":"#f1f1f1","scrollBarBg":"#00000053","scrollBarBgOver":"#0000007a","scrollBg":"#0000001a","scrollBgOver":"#0000002c","smallCloseIconFg":"#c7c7c7","smallCloseIconFgOver":"#a3a3a3","radialFg":"windowFgActive","radialBg":"#00000056","placeholderFg":"windowSubTextFg","placeholderFgActive":"#aaaaaa","inputBorderFg":"#e0e0e0","filterInputBorderFg":"#54c3f3","filterInputInactiveBg":"windowBgOver","checkboxFg":"#b3b3b3","sliderBgInactive":"#e1eaef","sliderBgActive":"windowBgActive","tooltipBg":"#eef2f5","tooltipFg":"#5d6c80","tooltipBorderFg":"#c9d1db","titleShadow":"#00000003","titleBg":"windowBgOver","titleBgActive":"titleBg","titleButtonBg":"titleBg","titleButtonFg":"#ababab","titleButtonBgOver":"#e5e5e5","titleButtonFgOver":"#9a9a9a","titleButtonBgActive":"titleButtonBg","titleButtonFgActive":"titleButtonFg","titleButtonBgActiveOver":"titleButtonBgOver","titleButtonFgActiveOver":"titleButtonFgOver","titleButtonCloseBg":"titleButtonBg","titleButtonCloseFg":"titleButtonFg","titleButtonCloseBgOver":"#e81123","titleButtonCloseFgOver":"windowFgActive","titleButtonCloseBgActive":"titleButtonCloseBg","titleButtonCloseFgActive":"titleButtonCloseFg","titleButtonCloseBgActiveOver":"titleButtonCloseBgOver","titleButtonCloseFgActiveOver":"titleButtonCloseFgOver","titleFg":"#acacac","titleFgActive":"#3e3c3e","trayCounterBg":"#f23c34","trayCounterBgMute":"#888888","trayCounterFg":"#ffffff","trayCounterBgMacInvert":"#ffffff","trayCounterFgMacInvert":"#ffffff01","layerBg":"#0000007f","cancelIconFg":"menuIconFg","cancelIconFgOver":"menuIconFgOver","boxBg":"windowBg","boxTextFg":"windowFg","boxTextFgGood":"#4ab44a","boxTextFgError":"#d84d4d","boxTitleFg":"#404040","boxSearchBg":"windowBg","boxTitleAdditionalFg":"#808080","boxTitleCloseFg":"cancelIconFg","boxTitleCloseFgOver":"cancelIconFgOver","membersAboutLimitFg":"windowSubTextFgOver","contactsBg":"windowBg","contactsBgOver":"windowBgOver","contactsNameFg":"boxTextFg","contactsStatusFg":"windowSubTextFg","contactsStatusFgOver":"windowSubTextFgOver","contactsStatusFgOnline":"windowActiveTextFg","photoCropFadeBg":"layerBg","photoCropPointFg":"#ffffff7f","introBg":"windowBg","introTitleFg":"windowBoldFg","introDescriptionFg":"windowSubTextFg","introErrorFg":"windowSubTextFg","introCoverTopBg":"#0f89d0","introCoverBottomBg":"#39b0f0","introCoverIconsFg":"#5ec6ff","introCoverPlaneTrace":"#5ec6ff69","introCoverPlaneInner":"#c6d8e8","introCoverPlaneOuter":"#a1bed4","introCoverPlaneTop":"#ffffff","dialogsMenuIconFg":"menuIconFg","dialogsMenuIconFgOver":"menuIconFgOver","dialogsBg":"windowBg","dialogsNameFg":"windowBoldFg","dialogsChatIconFg":"dialogsNameFg","dialogsDateFg":"windowSubTextFg","dialogsTextFg":"windowSubTextFg","dialogsTextFgService":"windowActiveTextFg","dialogsDraftFg":"#dd4b39","dialogsVerifiedIconBg":"windowBgActive","dialogsVerifiedIconFg":"windowFgActive","dialogsSendingIconFg":"#c1c1c1","dialogsSentIconFg":"#5dc452","dialogsUnreadBg":"windowBgActive","dialogsUnreadBgMuted":"#bbbbbb","dialogsUnreadFg":"windowFgActive","dialogsBgOver":"windowBgOver","dialogsNameFgOver":"windowBoldFgOver","dialogsChatIconFgOver":"dialogsNameFgOver","dialogsDateFgOver":"windowSubTextFgOver","dialogsTextFgOver":"windowSubTextFgOver","dialogsTextFgServiceOver":"dialogsTextFgService","dialogsDraftFgOver":"dialogsDraftFg","dialogsVerifiedIconBgOver":"dialogsVerifiedIconBg","dialogsVerifiedIconFgOver":"dialogsVerifiedIconFg","dialogsSendingIconFgOver":"dialogsSendingIconFg","dialogsSentIconFgOver":"dialogsSentIconFg","dialogsUnreadBgOver":"dialogsUnreadBg","dialogsUnreadBgMutedOver":"dialogsUnreadBgMuted","dialogsUnreadFgOver":"dialogsUnreadFg","dialogsBgActive":"#419fd9","dialogsNameFgActive":"windowFgActive","dialogsChatIconFgActive":"dialogsNameFgActive","dialogsDateFgActive":"windowFgActive","dialogsTextFgActive":"windowFgActive","dialogsTextFgServiceActive":"dialogsTextFgActive","dialogsDraftFgActive":"#c6e1f7","dialogsVerifiedIconBgActive":"dialogsTextFgActive","dialogsVerifiedIconFgActive":"dialogsBgActive","dialogsSendingIconFgActive":"#ffffff99","dialogsSentIconFgActive":"dialogsTextFgActive","dialogsUnreadBgActive":"dialogsTextFgActive","dialogsUnreadBgMutedActive":"dialogsDraftFgActive","dialogsUnreadFgActive":"dialogsBgActive","dialogsForwardBg":"dialogsBgActive","dialogsForwardFg":"dialogsNameFgActive","searchedBarBg":"windowBgOver","searchedBarFg":"windowSubTextFgOver","topBarBg":"windowBg","emojiPanBg":"windowBg","emojiPanCategories":"#f7f7f7","emojiPanHeaderFg":"windowSubTextFg","emojiPanHeaderBg":"#fffffff2","stickerPanDeleteBg":"#000000cc","stickerPanDeleteFg":"windowFgActive","stickerPreviewBg":"#ffffffb0","historyTextInFg":"windowFg","historyTextOutFg":"windowFg","historyCaptionInFg":"historyTextInFg","historyCaptionOutFg":"historyTextOutFg","historyFileNameInFg":"historyTextInFg","historyFileNameOutFg":"historyTextOutFg","historyOutIconFg":"dialogsSentIconFg","historyOutIconFgSelected":"#4da79f","historyIconFgInverted":"windowFgActive","historySendingOutIconFg":"#98d292","historySendingInIconFg":"#a0adb5","historySendingInvertedIconFg":"#ffffffc8","historyUnreadBarBg":"#fcfbfa","historyUnreadBarBorder":"shadowFg","historyUnreadBarFg":"#538bb4","historyForwardChooseBg":"#0000004c","historyForwardChooseFg":"windowFgActive","historyPeer1NameFg":"#c03d33","historyPeer1UserpicBg":"#e17076","historyPeer2NameFg":"#4fad2d","historyPeer2UserpicBg":"#7bc862","historyPeer3NameFg":"#d09306","historyPeer3UserpicBg":"#e5ca77","historyPeer4NameFg":"windowActiveTextFg","historyPeer4UserpicBg":"#65aadd","historyPeer5NameFg":"#8544d6","historyPeer5UserpicBg":"#a695e7","historyPeer6NameFg":"#cd4073","historyPeer6UserpicBg":"#ee7aae","historyPeer7NameFg":"#2996ad","historyPeer7UserpicBg":"#6ec9cb","historyPeer8NameFg":"#ce671b","historyPeer8UserpicBg":"#faa774","historyPeerUserpicFg":"windowFgActive","historyScrollBarBg":"#517c417a","historyScrollBarBgOver":"#517c41bc","historyScrollBg":"#517c414c","historyScrollBgOver":"#517c416b","msgInBg":"windowBg","msgInBgSelected":"#c2dcf2","msgOutBg":"#effdde","msgOutBgSelected":"#b7dbdb","msgSelectOverlay":"#358cd44c","msgStickerOverlay":"#358cd47f","msgInServiceFg":"windowActiveTextFg","msgInServiceFgSelected":"windowActiveTextFg","msgOutServiceFg":"#3a8e26","msgOutServiceFgSelected":"#367570","msgInShadow":"#748ea229","msgInShadowSelected":"#548dbb29","msgOutShadow":"#3ac34740","msgOutShadowSelected":"#37a78e40","msgInDateFg":"#a0acb6","msgInDateFgSelected":"#6a9cc5","msgOutDateFg":"#6cc264","msgOutDateFgSelected":"#50a79c","msgServiceFg":"windowFgActive","msgServiceBg":"#517c417f","msgServiceBgSelected":"#96b38ba2","msgInReplyBarColor":"activeLineFg","msgInReplyBarSelColor":"activeLineFg","msgOutReplyBarColor":"historyOutIconFg","msgOutReplyBarSelColor":"historyOutIconFgSelected","msgImgReplyBarColor":"msgServiceFg","msgInMonoFg":"#4e7391","msgOutMonoFg":"#469165","msgDateImgFg":"msgServiceFg","msgDateImgBg":"#00000054","msgDateImgBgOver":"#00000074","msgDateImgBgSelected":"#1c4a7187","msgFileThumbLinkInFg":"lightButtonFg","msgFileThumbLinkInFgSelected":"lightButtonFgOver","msgFileThumbLinkOutFg":"#5eba5b","msgFileThumbLinkOutFgSelected":"#31a298","msgFileInBg":"windowBgActive","msgFileInBgOver":"#4eade3","msgFileInBgSelected":"#51a3d3","msgFileOutBg":"#78c67f","msgFileOutBgOver":"#6bc272","msgFileOutBgSelected":"#5fb389","msgFile1Bg":"#72b1df","msgFile1BgDark":"#5c9ece","msgFile1BgOver":"#5294c4","msgFile1BgSelected":"#5099d0","msgFile2Bg":"#61b96e","msgFile2BgDark":"#4da859","msgFile2BgOver":"#44a050","msgFile2BgSelected":"#46a07e","msgFile3Bg":"#e47272","msgFile3BgDark":"#cd5b5e","msgFile3BgOver":"#c35154","msgFile3BgSelected":"#9f6a82","msgFile4Bg":"#efc274","msgFile4BgDark":"#e6a561","msgFile4BgOver":"#dc9c5a","msgFile4BgSelected":"#b19d84","historyFileInIconFg":"msgInBg","historyFileInIconFgSelected":"msgInBgSelected","historyFileInRadialFg":"historyFileInIconFg","historyFileInRadialFgSelected":"historyFileInIconFgSelected","historyFileOutIconFg":"msgOutBg","historyFileOutIconFgSelected":"msgOutBgSelected","historyFileOutRadialFg":"historyFileOutIconFg","historyFileOutRadialFgSelected":"historyFileOutIconFgSelected","historyFileThumbIconFg":"msgInBg","historyFileThumbIconFgSelected":"msgInBgSelected","historyFileThumbRadialFg":"historyFileThumbIconFg","historyFileThumbRadialFgSelected":"historyFileThumbIconFgSelected","msgWaveformInActive":"windowBgActive","msgWaveformInActiveSelected":"#51a3d3","msgWaveformInInactive":"#d4dee6","msgWaveformInInactiveSelected":"#9cc1e1","msgWaveformOutActive":"#78c67f","msgWaveformOutActiveSelected":"#6badad","msgWaveformOutInactive":"#b3e2b4","msgWaveformOutInactiveSelected":"#91c3c3","msgBotKbOverBgAdd":"#ffffff20","msgBotKbIconFg":"msgServiceFg","msgBotKbRippleBg":"#00000020","mediaInFg":"msgInDateFg","mediaInFgSelected":"msgInDateFgSelected","mediaOutFg":"msgOutDateFg","mediaOutFgSelected":"msgOutDateFgSelected","youtubePlayIconBg":"#e83131c8","youtubePlayIconFg":"windowFgActive","videoPlayIconBg":"#0000007f","videoPlayIconFg":"#ffffff","toastBg":"#000000b2","toastFg":"windowFgActive","reportSpamBg":"emojiPanHeaderBg","reportSpamFg":"windowFg","historyToDownBg":"windowBg","historyToDownBgOver":"windowBgOver","historyToDownBgRipple":"windowBgRipple","historyToDownFg":"menuIconFg","historyToDownFgOver":"menuIconFgOver","historyToDownShadow":"#00000040","historyComposeAreaBg":"msgInBg","historyComposeAreaFg":"historyTextInFg","historyComposeAreaFgService":"msgInDateFg","historyComposeIconFg":"menuIconFg","historyComposeIconFgOver":"menuIconFgOver","historySendIconFg":"windowBgActive","historySendIconFgOver":"windowBgActive","historyPinnedBg":"historyComposeAreaBg","historyReplyBg":"historyComposeAreaBg","historyReplyIconFg":"windowBgActive","historyReplyCancelFg":"cancelIconFg","historyReplyCancelFgOver":"cancelIconFgOver","historyComposeButtonBg":"historyComposeAreaBg","historyComposeButtonBgOver":"windowBgOver","historyComposeButtonBgRipple":"windowBgRipple","overviewCheckBg":"#00000040","overviewCheckFg":"windowBg","overviewCheckFgActive":"windowBg","overviewPhotoSelectOverlay":"#40ace333","profileStatusFgOver":"#7c99b2","profileVerifiedCheckBg":"windowBgActive","profileVerifiedCheckFg":"windowFgActive","profileAdminStartFg":"windowBgActive","notificationsBoxMonitorFg":"windowFg","notificationsBoxScreenBg":"dialogsBgActive","notificationSampleUserpicFg":"windowBgActive","notificationSampleCloseFg":"#d7d7d7","notificationSampleTextFg":"#d7d7d7","notificationSampleNameFg":"#939393","mainMenuBg":"windowBg","mainMenuCoverBg":"dialogsBgActive","mainMenuCoverFg":"windowFgActive","mediaPlayerBg":"windowBg","mediaPlayerActiveFg":"windowBgActive","mediaPlayerInactiveFg":"sliderBgInactive","mediaPlayerDisabledFg":"#9dd1ef","mediaviewFileBg":"windowBg","mediaviewFileNameFg":"windowFg","mediaviewFileSizeFg":"windowSubTextFg","mediaviewFileRedCornerFg":"#d55959","mediaviewFileYellowCornerFg":"#e8a659","mediaviewFileGreenCornerFg":"#49a957","mediaviewFileBlueCornerFg":"#599dcf","mediaviewFileExtFg":"activeButtonFg","mediaviewMenuBg":"#383838","mediaviewMenuBgOver":"#505050","mediaviewMenuBgRipple":"#676767","mediaviewMenuFg":"windowFgActive","mediaviewBg":"#222222eb","mediaviewVideoBg":"imageBg","mediaviewControlBg":"#0000003c","mediaviewControlFg":"windowFgActive","mediaviewCaptionBg":"#11111180","mediaviewCaptionFg":"mediaviewControlFg","mediaviewTextLinkFg":"#91d9ff","mediaviewSaveMsgBg":"toastBg","mediaviewSaveMsgFg":"toastFg","mediaviewPlaybackActive":"#c7c7c7","mediaviewPlaybackInactive":"#252525","mediaviewPlaybackActiveOver":"#ffffff","mediaviewPlaybackInactiveOver":"#474747","mediaviewPlaybackProgressFg":"#ffffffc7","mediaviewPlaybackIconFg":"mediaviewPlaybackActive","mediaviewPlaybackIconFgOver":"mediaviewPlaybackActiveOver","mediaviewTransparentBg":"#ffffff","mediaviewTransparentFg":"#cccccc","notificationBg":"windowBg"}';
        if ($("#data").val() == "") var json_obj = JSON.parse(json_raw);
        for (var key in json_obj) {
            if (json_obj[key][0] == "#" && json_obj[key].length < 8) $("#main").append('<div ' + 'style="background:' + json_obj[key] + '" class="exported_colour"><span style="background: white">' + key + ": <input class='hex jscolor {hash:true}' type=text value='" + json_obj[key] + "'></div>");

            if (json_obj[key][0] != "#" && inlinesearch(json_obj, json_obj[key]).length < 8) $("#inherited").append('<div ' + 'style="background:' + inlinesearch(json_obj, json_obj[key]) + '" class="exported_colour"><span style="background: white">' + key + ": <b>" + json_obj[key] + '</b></span></div>');

            if (json_obj[key][0] != "#" && inlinesearch(json_obj, json_obj[key]).length > 7) $("#inherited").append('<div ' + 'style="background:' + hexToRgbA(inlinesearch(json_obj, json_obj[key]).substring(0, 7)) + parseInt(inlinesearch(json_obj, json_obj[key]).substring(7, 9), 16) / 256 + ')" class="exported_colour"><span style="background: white">' + key + ": <b>" + json_obj[key] + '</b></span></div>');

            if (json_obj[key][0] == "#" && json_obj[key].length > 7) $("#alpha").append('<div ' + 'style="background:' + hexToRgbA(json_obj[key].substring(0, 7)) + parseInt(json_obj[key].substring(7, 9), 16) / 256 + ')" class="exported_colour"><span style="background: white">' + key + ": <input class='hex jscolor_a {hash:true}' type=text value='" + json_obj[key].substring(0,7) + "'><input class='hex_a' type=text value='" + json_obj[key].substring(7,9) + "'></div>");
            //else $("#output").append('<div ' + 'style="background:' + json_obj[json_obj[key]] +  '" class="exported_colour"><span style="background: white">' + key + " copied <b>" + json_obj[key] + '</b></span></div>')
        }
        ;
        jscolor.installByClassName('jscolor');
        jscolor.installByClassName('jscolor_a');
        $('.jscolor_a').each(function () {
            $(this).css({
          background : "rgba" + $(this).css("background-color").slice(3, -1) + ", " + parseInt($(this).next().val(), 16) / 256 + ')' 
        });
        });
        $(".jscolor").change(function() {
    // 'jscolor' instance can be used as a string
        $(this).closest(".exported_colour").css({
          background : $(this).css("background-color")
        });
        });
        $(".jscolor_a").change(function() {
          //alert($(this).css("background-color").slice(0, -1) + ", " + parseInt($(this).next().val(), 16) / 256 + ')');
    // 'jscolor' instance can be used as a string
        $(this).closest(".exported_colour").css({
          background : "rgba" + $(this).css("background-color").slice(3, -1) + ", " + parseInt($(this).next().val(), 16) / 256 + ')' 
        });
        $(this).css({
          background : "rgba" + $(this).css("background-color").slice(3, -1) + ", " + parseInt($(this).next().val(), 16) / 256 + ')' 
        });
        });
        //color_picker.register();
        $("input").click(function () {
            if ($("#cb1").prop("checked") == false) $("#main").css({
                display: "none"
            });
            else $("#main").css({
                display: "block"
            });
            if ($("#cb2").prop("checked") == false) $("#inherited").css({
                display: "none"
            });
            else $("#inherited").css({
                display: "block"
            });
            if ($("#cb3").prop("checked") == false) $("#alpha").css({
                display: "none"
            });
            else $("#alpha").css({
                display: "block"
            });

        });
    });


    $("#download").click(function (argument) {
        var theText = "";
        $('.exported_colour').each(function () {
            theText += $(this).children("span").text();
            if ($(this).children("span").children("input").length) {
              theText += $(this).children("span").children().val();
              var hex_a = "";
              if ((hex_a =  $(this).children("span").children("input").next().val()) != undefined) theText+=hex_a;
            } 
            
            theText += ";" + '\n';
        });
        if (theText == "") return;
        /*download('colors.tdesktop-theme', theText);*/

        var zip = new JSZip();
        zip.file("colors.tdesktop-theme", theText);
        zip.file("background.jpg", getBase64ImageById($("#bgcolor").val()), {base64: true});
        zip.generateAsync({type: "blob"})
            .then(function (content) {
                // see FileSaver.js
                saveAs(content, "theme.tdesktop-theme");
            });
    })
});

