"use strict";
// Function to initialize the resume form event listener
document
    .getElementById("resumeForm")
    ?.addEventListener("submit", (event) => {
    event.preventDefault();
    // Type assertions for form inputs
    const profilePicInput = document.getElementById('profilePic');
    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");
    const phoneElement = document.getElementById("phone");
    const educationElement = document.getElementById("education");
    const experienceElement = document.getElementById("experience");
    const skillsElement = document.getElementById("skills");
    const usernameElement = document.getElementById("username");
    // Check if all necessary elements are present
    if (profilePicInput &&
        nameElement &&
        emailElement &&
        phoneElement &&
        educationElement &&
        experienceElement &&
        skillsElement &&
        usernameElement) {
        // Extracting values from input elements
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const username = usernameElement.value;
        const uniquePath = `resumes/${username.replace(/\s+/g, '_')}_cv.html`;
        // Handling profile picture file
        const profilePicFile = profilePicInput.files?.[0];
        const profilePicURL = profilePicFile ? URL.createObjectURL(profilePicFile) : "";
        // Creating the resume output as HTML string
        const resumeHTML = `
        <h2>Resume</h2>
        <fieldset>
          <legend>Personal Information</legend>
          ${profilePicURL ? `<img src="${profilePicURL}" alt="Profile Picture" class="profilePic">` : ""}
          <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
          <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
          <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
        </fieldset>

        <fieldset>
          <legend>Education</legend>
          <p><strong>Education:</strong> <span id="edit-education" class="editable">${education}</span></p>
        </fieldset>

        <fieldset>
          <legend>Experience</legend>
          <p><strong>Experience:</strong> <span id="edit-experience" class="editable">${experience}</span></p>
        </fieldset>

        <fieldset>
          <legend>Skills</legend>
          <p><strong>Skills:</strong> <span id="edit-skills" class="editable">${skills}</span></p>
        </fieldset>
      `;
        // Assuming there are no specific types needed that can't be inferred from this snippet
        const resumeOutputElement = document.getElementById("resumeOutput");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeHTML;
            resumeOutputElement.classList.remove("hidden");
            // Create container for buttons
            const buttonsContainer = document.createElement("div");
            buttonsContainer.id = "buttonsContainer";
            resumeOutputElement.appendChild(buttonsContainer);
            // Add Download PDF button
            const downloadButton = document.createElement("button");
            downloadButton.textContent = "Download as PDF";
            downloadButton.addEventListener("click", () => {
                window.print(); // Open the print dialog, allowing the user to save as PDF.
            });
            buttonsContainer.appendChild(downloadButton);
            // Add Shareable Link button
            const shareLinkButton = document.createElement("button");
            shareLinkButton.textContent = "Copy Shareable Link";
            shareLinkButton.addEventListener("click", async () => {
                try {
                    // Create a unique shareable link (simulate it in this case)
                    const shareableLink = `https://yourdomain.com/resumes/${name.replace(/\s+/g, '-')}`;
                    await navigator.clipboard.writeText(shareableLink);
                    alert("Shareable link copied to clipboard!");
                }
                catch (err) {
                    console.error("Failed to copy link: ", err);
                    alert("Failed to copy link to clipboard. Please try again.");
                }
            });
            buttonsContainer.appendChild(shareLinkButton);
            // Make fields editable
            makeEditable();
        }
    }
    else {
        console.error("One or more input elements are missing");
    }
});
// Function to make text fields editable
function makeEditable() {
    const editableElements = document.querySelectorAll(".editable");
    editableElements.forEach((element) => {
        element.addEventListener("click", () => {
            const currentElement = element;
            const currentValue = currentElement.textContent || "";
            // Replacing the current text content with an input field
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                const input = document.createElement("input");
                input.type = "text";
                input.value = currentValue;
                input.classList.add("editing-input");
                // Event to replace input field back to text on blur
                input.addEventListener("blur", () => {
                    currentElement.textContent = input.value;
                    currentElement.style.display = "inline";
                    input.remove();
                });
                currentElement.style.display = "none";
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
