function createModal() {
    // Tworzenie i stylowanie modala
    const modal = createModalElement();
    document.body.appendChild(modal);

    const iframeContainer = modal.querySelector('#iframeContainer');
    const iframe = createIframe();
    iframeContainer.appendChild(iframe);

    // Obsługa iframe załadowanego
    iframe.onload = () => adjustIframeSize(iframe, modal);

    // Sprawdzanie iframe, ukrywanie elementów i dodawanie event listenerów
    const iframeCheckInterval = setInterval(() => handleIframeContent(iframe, modal, iframeContainer, iframeCheckInterval), 300);
    const acceptBtnInterval = setInterval(() => addListenerForAcceptBtn(iframe, modal, iframeContainer, acceptBtnInterval), 300);

    // Dodanie zamykania modala na kliknięcie "X" i poza modalem
    setupModalCloseListeners(modal, iframeContainer);
}

// Tworzenie elementu modala
function createModalElement() {
    const modal = document.createElement('div');
    modal.id = 'myModal';
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeModal = document.createElement('span');
    closeModal.innerHTML = '&times;';
    closeModal.classList.add('close-modal');

    const iframeContainer = document.createElement('div');
    iframeContainer.id = 'iframeContainer';

    modalContent.appendChild(closeModal);
    modalContent.appendChild(iframeContainer);
    modal.appendChild(modalContent);

    return modal;
}

// Tworzenie iframe
function createIframe() {
    const iframe = document.createElement('iframe');
    iframe.id = 'iframe';
    iframe.src = 'https://hcm-eu10-sales.hr.cloud.sap/xi/ui/genericobject/pages/mdf/mdf.xhtml?&#t=cust_adamed&n=1&u=adamed';
    iframe.style.width = '100%';
    iframe.style.height = '500px';
    iframe.style.border = 'none';
    return iframe;
}

// Dopasowanie rozmiaru iframe
function adjustIframeSize(iframe, modal) {
    try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDocument) {
            const contentWidth = iframeDocument.body.scrollWidth;
            iframe.style.width = contentWidth + 'px';
            modal.querySelector('.modal-content').style.width = contentWidth + 'px';
        }
    } catch (e) {
        console.log('Error adjusting iframe size:', e);
    }
}

// Ukrywanie elementów w iframe i zamykanie modala
function handleIframeContent(iframe, modal, iframeContainer, intervalId) {
    try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDocument) {
            hideElementsInIframe(iframeDocument);
            const cancelBtn = iframeDocument.getElementById('dlgButton_319_');
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => closeModal(modal, iframeContainer));
                clearInterval(intervalId);
            }
        }
    } catch (e) {
        console.log('Cannot find element to hide', e);
        clearInterval(intervalId);
    }
}

// Ukrywanie elementów w iframe
function hideElementsInIframe(iframeDocument) {
    const elementsToHide = ['renderTopNavFixedWidthV12', 'admin-breadcrums', '4__metaDataHeader', '4__searchBarContainer'];
    elementsToHide.forEach(id => {
        const element = iframeDocument.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    });
}

// Dodawanie listenera do przycisku akceptacji
function addListenerForAcceptBtn(iframe, modal, iframeContainer, intervalId) {
    try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDocument && iframeDocument.getElementById('630__dialogBox')) {
            iframeDocument.querySelectorAll('.globalPrimaryButton').forEach(button => {
                button.addEventListener('click', () => closeModal(modal, iframeContainer));
            });
            clearInterval(intervalId);
        }
    } catch (e) {
        console.log('Cannot add listener', e);
        clearInterval(intervalId);
    }
}

// Dodanie listenerów do zamknięcia modala
function setupModalCloseListeners(modal, iframeContainer) {
    modal.querySelector('.close-modal').addEventListener('click', () => closeModal(modal, iframeContainer));

    window.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal(modal, iframeContainer);
        }
    });
}

// Zamykanie modala
function closeModal(modal, iframeContainer) {
    modal.style.display = 'none';
    iframeContainer.innerHTML = '';
}

// Stylowanie poprzez CSS klasy
const style = document.createElement('style');
style.innerHTML = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .modal-content {
        background-color: #fefefe;
        margin: 4% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 70%;
    }
    .close-modal {
        cursor: pointer;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// Wywołanie funkcji
createModal();