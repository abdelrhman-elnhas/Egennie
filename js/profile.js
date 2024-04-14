var profileData = {};

$(document).ready(function () {
  Parse.initialize(
    "RxdTfd9zwVyIEqjFapfjGZkbdQMPaN7CD0lzSGSf",
    "DoxsJlrkD5fn6BFfin1KMIebkSXBEqYr2zS61UDh"
  );
  Parse.User.enableRevocableSession();

  $(".supervisor-email-icon-custom").popover({
    content:
      "FOR TEAMMATE VERIFICATION ONLY" +
      '<div class="supervisor-email-icon-popover-close" onclick="closeSupervisorPopover()">x</div>',
    html: true,
    animation: true,
    trigger: "click hover",
    template:
      '<div class="popover"><div class="arrow"></div><div class="popover-content"></div></div>',
  });

  showEditPicture();
});

function showEditPicture() {
  var nameOrganizationHeader = $(".name-organization").html();
  var picture = $("<div>").addClass("picture clip-circle");
  picture.appendTo(".logo");
  $(".picture").bind("error", function (event) {
    $(".picture").remove();
  });

  var editPictureContainer = $("<div>")
    .addClass("edit-picture-container")
    .attr("onclick", "showEditPictureURL()");
  var editPicture = $("<div>").addClass("edit-picture").text("Edit Picture");
  editPicture.appendTo(editPictureContainer);
  $(".name-organization").html(editPictureContainer);

  var editPictureInputContainer = $("<div>").addClass(
    "edit-picture-input-container"
  );
  var editPictureInput = $("<input>")
    .attr({
      type: "text",
      id: "edit-picture-input",
      onchange: "updatePicture()",
      placeholder: "Enter URL of your picture",
    })
    .val(profileData.picture);
  editPictureInput.appendTo(editPictureInputContainer);
  editPictureInputContainer.insertAfter(".navbar");
  $(".edit-picture-input-container").hide();
}

function updatePicture() {
  $(".picture").css(
    "background-image",
    'url("' + $("#edit-picture-input").val() + '")'
  );
}

function showEditPictureURL() {
  if ($(".edit-picture-input-container").is(":visible")) {
    $(".edit-picture").removeClass("edit-picture-save");
    $(".edit-picture-input-container").slideUp(500);
    $(".edit-picture").text("Edit Picture");
    updatePicture();
    savePicture();
  } else {
    $(".edit-picture").addClass("edit-picture-save");
    $(".edit-picture-input-container").slideDown(500);
    $(".edit-picture").text("Save Picture");
  }
}

function closeSupervisorPopover() {
  $(".supervisor-email-icon-custom").popover("hide");
}

function editProfile() {
  if ($(".btn-edit").hasClass("btn-save")) {
    $(".btn-edit").removeClass("btn-save").text("تعديل");

    //$('.name').html($('#first-name-input').val() +
    //  ' ' + $('#last-name-input').val());
    //$('.organization').html(
    //    $('#profile-organization-input').val() );

    var firstName = $("<div>")
      .addClass("first-name")
      .html($("#first-name-input").val())
      .insertAfter(".first-name-label");

    var lastName = $("<div>")
      .addClass("last-name")
      .html($("#last-name-input").val())
      .insertAfter(".last-name-label");

    var organization = $("<div>")
      .addClass("profile-organization")
      .html($("#profile-organization-input").val())
      .insertAfter(".profile-organization-label");

    var email = $("<div>")
      .addClass("email")
      .html($("#email-input").val())
      .insertAfter(".email-label");

    var supervisorEmail = $("<div>")
      .addClass("supervisor-email")
      .html($("#supervisor-email-input").val())
      .insertAfter(".supervisor-email-label");

    var title = $("<div>")
      .addClass("profile-title")
      .html($("#profile-title-input").val())
      .insertAfter(".profile-title-label");

    $(".first-name-input-container").remove();
    $(".last-name-input-container").remove();
    $(".profile-organization-input-container").remove();
    $(".email-input-container").remove();
    $(".supervisor-email-input-container").remove();
    $(".profile-title-input-container").remove();

    saveProfile();

    return;
  } else {
    $(".btn-edit").addClass("btn-save").text("حفظ");
  }

  var firstNameContainer = $("<div>").addClass("first-name-input-container");
  var firstName = $("<input>")
    .attr({
      type: "text",
      id: "first-name-input",
    })
    .val($(".first-name").html())
    .appendTo(firstNameContainer);
  firstNameContainer.appendTo(".first-name-label");

  var lastNameContainer = $("<div>").addClass("last-name-input-container");
  var lastName = $("<input>")
    .attr({
      type: "text",
      id: "last-name-input",
    })
    .val($(".last-name").html())
    .appendTo(lastNameContainer);
  lastNameContainer.appendTo(".last-name-label");

  var organizationContainer = $("<div>").addClass(
    "profile-organization-input-container"
  );
  var organization = $("<input>")
    .attr({
      type: "text",
      id: "profile-organization-input",
    })
    .val($(".profile-organization").html())
    .appendTo(organizationContainer);
  organizationContainer.appendTo(".profile-organization-label");

  var emailContainer = $("<div>").addClass("email-input-container");
  var email = $("<input>")
    .attr({
      type: "text",
      id: "email-input",
    })
    .val($(".email").html())
    .appendTo(emailContainer);
  emailContainer.appendTo(".email-label");

  var supervisorEmailContainer = $("<div>").addClass(
    "supervisor-email-input-container"
  );
  var email = $("<input>")
    .attr({
      type: "text",
      id: "supervisor-email-input",
    })
    .val($(".supervisor-email").html())
    .appendTo(supervisorEmailContainer);
  supervisorEmailContainer.appendTo(".supervisor-email-label");

  var titleContainer = $("<div>").addClass("profile-title-input-container");
  var email = $("<input>")
    .attr({
      type: "text",
      id: "profile-title-input",
    })
    .val($(".profile-title").html())
    .appendTo(titleContainer);
  titleContainer.appendTo(".profile-title-label");

  $(".first-name").remove();
  $(".last-name").remove();
  $(".profile-organization").remove();
  $(".email").remove();
  $(".supervisor-email").remove();
  $(".profile-title").remove();
  $(".profile-panel hr").remove();
}

function savePicture() {
  profileData.picture = $("#edit-picture-input").val();

  saveProfileToParse();
}
function saveProfile() {
  profileData.firstname = $(".first-name").html();
  profileData.lastname = $(".last-name").html();
  profileData.lastname = $(".first-name").html();
  profileData.organization = $(".profile-organization").html();
  profileData.email = $(".email").html();
  profileData.supervisoremail = $(".supervisor-email").html();
  profileData.title = $(".profile-title").html();

  saveProfileToParse();
}

function saveProfileToParse() {
  var currentUser = Parse.User.current();
  if (!currentUser) {
    alert("Not logged in");
    //showLogin();
    return;
  }

  Parse.Cloud.run(
    "saveProfile",
    {
      profileData: JSON.stringify(profileData),
    },
    {
      success: function (saveLocation) {
        console.log(saveLocation);
        alert("Data saved to Parse cloud");
      },
      error: function (error) {
        console.log(error);
        alert(
          "Parse database save error code: " +
            error.code +
            " message: " +
            error.message
        );
      },
    }
  );
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#imagePreview").css(
        "background-image",
        "url(" + e.target.result + ")"
      );
      $("#imagePreview").hide();
      $("#imagePreview").fadeIn(650);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUpload").change(function () {
  readURL(this);
});
