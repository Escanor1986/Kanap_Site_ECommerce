class ProgressBar {
  constructor(element) {
    this.element = element;

    this.loaderContainer = document.querySelector('.loaderContainer');
    this.element.classList.add("progressBar");

    if (this.element.dataset.type != undefined) {
      this.type = this.element.dataset.type;
    } else {
      this.type = "basic";
    }

    this.progress = document.createElement("div");
    this.progress.classList.add("progress");
    this.progress.classList.add(this.type);

    if (this.element.dataset.striped) {
      this.progress.classList.add("striped");
    }

    this.changeProgress(parseInt(this.element.dataset.value));
    this.element.appendChild(this.progress);
  }

  changeProgress(progress) {
    if (progress > 100) {
      this.progressValue = 100;
      this.loaderContainer.style.display = 'none';
    } else {
      this.progressValue = progress;
    }
    this.progress.style.width = `${this.progressValue}%`;
  }
}
