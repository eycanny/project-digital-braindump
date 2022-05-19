# Digital Braindump
Digital Braindump serves as a minimalistic application for users to declutter their mind and thoughts by transferring that mental information into a digital space through the form of notes.

Digital Braindump is a full-stack web application created by Nancy as her capstone project for Hackbright's Full-Time Software Engineering Program, in which its progress spanned over four weeks in an agile environment.

## Table of Contents
* [Tech Stack](#techstack)
* [Features Currently Available](#currentfeatures)
* [Stretch Features Considered](#stretchfeatures)
* [About the Developer](#about)

## <a name="techstack"></a>Tech Stack
* Python
* HTML
* Javascript
* CSS
* Flask
* PostgresSQL
* SQLAlchemy
* Jinja
* AJAX
* Faker
* Bootstrap
* They Said So REST Quotes API
* Cloudinary Upload API

(Dependencies are listed in requirements.txt)

## <a name="currentfeatures"></a>Features Currently Available
* User can create an account.
* User can log in and log out.
* User can create a note.
    * User can also upload an image file as the note's body, the note's attachment, or both.
    * The note's body can contain text or an image but not both.
* User can edit or delete a note.
    * When editing, a function to quickly clear the body of the note is available.
        * Clearing the body removes any text or image in that field. The removal of this information is not permanent (e.g. if user decides to cancel the edits) until user clicks on the Save button.
* User can view all notes they have created except those that were deleted.
* User can sort notes using available sorting options.
* User can search using keywords.
    * If user searches without any keywords, this will show user all notes available.
* Application will show a quote of the day pulled from the They Said So REST Quotes API.
    * The application is using this API on a free basis and does have a rate limit of 10 calls/hour.

## <a name="stretchfeatures"></a>Stretch Features Considered
These are potential features in consideration for any future development.

* Ability for user to customize a note in various ways while keeping in mind the original intent of the application being minimalistic
* Ability for user to group notes into a collection
* Documentation to help user navigate through the application
* Side menu to hold collections and/or functions

## <a name="about"></a>About the Developer
Nancy is a software engineer in San Francisco.

<!-- Table of Contents Additions -->
<!-- * [How to Locally Run Digital Braindump](#localrun) -->

<!-- Subsection Additions -->
<!--## <a name="localrun"></a>How to Locally Run Digital Braindump -->