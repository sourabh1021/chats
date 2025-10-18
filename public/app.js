document.addEventListener("DOMContentLoaded", () => {
  console.log("JS file loaded "); // for testing

  const deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach(button => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // stop form from submitting right away

      const confirmation = confirm("Are you sure you want to delete this chat?");

      if (confirmation) {
        alert("Item deleted successfully!");
        this.closest("form").submit(); // continue with delete
      } else {
        alert("Delete canceled.");
      }
    });
  });
});
