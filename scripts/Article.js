class Article {
    constructor(NameProject, tehnology, description1, description2, data, linkCode, linkSite) {
        // Создание элемента article и установка класса
        this.article = document.createElement('article');
        this.article.className = 'containerCard';

        // Создание элемента NovisBlock
        const novisBlock = document.createElement('div');
        novisBlock.className = 'NovisBlock';

        // Создание блока изображения
        const imgInProjectCard = document.createElement('div');
        imgInProjectCard.className = '__imgInProjectCard';

        // Создание нижнего блока с информацией
        const bottomSpanCard = document.createElement('div');
        bottomSpanCard.className = '__bottomSpanCard';
        const spanTitle = document.createElement('span');
        spanTitle.textContent = NameProject;
        bottomSpanCard.appendChild(spanTitle);
        //  'Dota 2 : A Reference Guide' 'React + Js''biblioary'
        // Создание дополнительного блока с информацией
        const infoBlock = document.createElement('div');
        const spanTech = document.createElement('span');
        spanTech.textContent = tehnology;
        const spanLibrary = document.createElement('span');
        infoBlock.appendChild(spanTech);
        infoBlock.appendChild(spanLibrary);
        bottomSpanCard.appendChild(infoBlock);

        // Добавление элементов в novisBlock
        novisBlock.appendChild(imgInProjectCard);
        novisBlock.appendChild(bottomSpanCard);

        // Создание видимого блока карты
        const visbleBlockCard = document.createElement('div');
        visbleBlockCard.className = '__visbleBlockCard';

        // Создание контейнера с текстовым содержимым
        const textContentContainer = document.createElement('div');
        textContentContainer.className = '__textContent_containerOpasity';
        const containerTextOpacityBlock = document.createElement('div');
        textContentContainer.appendChild(containerTextOpacityBlock);
        const p1 = document.createElement('p');
        p1.textContent = description1;
        const p2 = document.createElement('p');
        p2.textContent = description2;
        containerTextOpacityBlock.appendChild(p1);
        containerTextOpacityBlock.appendChild(p2);

        // Создание контейнера с непрозрачностью карты
        const cardOpasityContainer = document.createElement('div');
        cardOpasityContainer.className = '_cardOpasity_Container';
        const dataAndButtonContainer = document.createElement('div');
        dataAndButtonContainer.className = '_container_data_and_button';
        const dateSpan = document.createElement('span');
        dateSpan.textContent = data;
        dataAndButtonContainer.appendChild(dateSpan);

        // Создание кнопок
        const buttonContainer = document.createElement('div');
        buttonContainer.className = '_containerButtonOpacity';
        const viewCodeButton = document.createElement('button');
        viewCodeButton.textContent = 'View code';
        const visitSiteButton = document.createElement('button');

        visitSiteButton.textContent = 'Visit site';
        buttonContainer.appendChild(viewCodeButton);
        buttonContainer.appendChild(visitSiteButton);
        dataAndButtonContainer.appendChild(buttonContainer);

        // Добавление элементов в контейнер с непрозрачностью карты
        cardOpasityContainer.appendChild(dataAndButtonContainer);

        // Добавление элементов в видимый блок карты
        visbleBlockCard.appendChild(textContentContainer);
        // visbleBlockCard.appendChild(cardOpasityContainer);
        textContentContainer.appendChild(cardOpasityContainer)
        // Добавление элементов в containerCard
        this.article.appendChild(novisBlock);
        this.article.appendChild(visbleBlockCard);

        viewCodeButton.addEventListener('click', () => {
            window.location.href = linkSite;
        });
        visitSiteButton.addEventListener('click', () => {
            window.location.href = linkCode;
        });
    }
    render() {
        return this.article
    }
}
