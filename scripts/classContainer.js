class SkillsItem {
    constructor(item, modals) {
        this.conteinerSlim = document.createElement("div");
        this.backplayt = document.createElement("div");
        this.spanText = document.createElement("span");
        this.Percentages = document.createElement("div");

        this.backplayt.style.width = item.width;
        this.conteinerSlim.classList.add('containerSpanSkillsome');
        this.backplayt.classList.add('test');
        this.spanText.classList.add('test12');
        this.Percentages.classList.add('Percentages');


        this.spanText.textContent = item.text;
        this.Percentages.textContent = item.width


        this.conteinerSlim.append(this.backplayt);
        this.conteinerSlim.append(this.spanText);
        this.conteinerSlim.append(this.Percentages);

        this.conteinerSlim.addEventListener('click', () => modals.open(item.content));

        window.addEventListener('resize', () => this.updateOverlap());

        requestAnimationFrame(() => this.updateOverlap());
    }

    updateOverlap() {
        if (!this.backplayt || !this.spanText) {
            console.error('Element(s) not found');
            return;
        }

        const testRect = this.backplayt.getBoundingClientRect();
        const text = this.spanText.textContent;

        this.spanText.innerHTML = '';

        text.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            charSpan.classList.add('classSpanList');
            this.spanText.appendChild(charSpan);
        });

        const charSpans = this.spanText.querySelectorAll('span');

        requestAnimationFrame(() => {
            charSpans.forEach(charSpan => {
                const charRect = charSpan.getBoundingClientRect();
                const isOverlapping = this.isOverlapping(charRect, testRect);

                charSpan.style.color = isOverlapping ? '#fff' : '#1d1f24';
            });
        });
    }

    isOverlapping(charRect, testRect) {
        return charRect.right > testRect.left &&
            charRect.left < testRect.right &&
            charRect.bottom > testRect.top &&
            charRect.top < testRect.bottom;
    }
    renderCont() {
        return this.conteinerSlim;
    }
}
