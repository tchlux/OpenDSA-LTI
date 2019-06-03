var exSettingsDialog;

function moduleClicked(modElem) {
    $(modElem.children[0]).toggleClass('fa-chevron-right');
    $(modElem.children[0]).toggleClass('fa-chevron-down');
}

function previewExercise(anchor, name, url, embed_code) {
    $('#iframe-container > iframe').replaceWith($.parseHTML(embed_code));
    $('#preview-title')[0].innerHTML = name;
    $('#preview-modal').modal();
}

function ltiExerciseSettingsChosen(selected, settings) {
    var launchUrl = window.ltiLaunchBaseUrl + '?';
    launchUrl += 'custom_ex_short_name=' + selected.short_name;
    launchUrl += '&custom_ex_settings=' + encodeURIComponent(JSON.stringify(settings));
    $('#lti-launch-url-input').val(launchUrl);
    $('#lti-launch-title')[0].innerHTML = 'LTI Launch URL - ' + selected.long_name;
    $('#lti-launch-url-modal').modal();
}

function ltiResourceSelect(selected) {
    if ($.inArray(selected.type, ['ss', 'ff']) !== -1) {
        ltiExerciseSettingsChosen(selected, {});
    }
    else {
        exSettingsDialog.show(selected, {}, true, true);
    }
}

$(document).ready(function () {
    exSettingsDialog = new ExerciseSettingsDialog(ltiExerciseSettingsChosen, "Next");
});