function createModal() {
    //create needed html elements
    const background = createBackground();
    const modalContent = createModalContent();
    const closeModal = createCloseModal();
    const iframeContainer = createIframeContainer();
    const iframe = createIframe('https://hcm-eu10-sales.hr.cloud.sap/xi/ui/genericobject/pages/mdf/mdf.xhtml?&#t=cust_adamed&n=1&u=adamed');

    //build html
    document.body.appendChild(background);
    background.appendChild(modalContent);
    modalContent.appendChild(closeModal);
    modalContent.appendChild(iframeContainer);
    iframeContainer.appendChild(iframe);

    //event handling and modal behavior
    iframe.onload = () => adjustIframeSize(iframe);
    checkAndHideIframeElements(iframe, background, iframeContainer);
    closeModal.addEventListener('click', () => handleCloseModalClick(background, iframeContainer));
    window.addEventListener('click', (event) => handleWindowClick(event, background, iframeContainer));
    setupAcceptButtonListener(iframe, background, iframeContainer);
}

function createBackground() {
    const background = document.createElement('div');
    background.id = 'myModal';
    background.style.display = 'none';
    background.style.position = 'fixed';
    background.style.zIndex = '1';
    background.style.left = '0';
    background.style.top = '0';
    background.style.width = '100%';
    background.style.height = '100%';
    background.style.overflow = 'auto';
    background.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    background.style.display = 'block';
    return background;
}

function createModalContent() {
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fefefe';
    modalContent.style.margin = '4% auto';
    modalContent.style.padding = '20px';
    modalContent.style.border = '1px solid #888';
    modalContent.style.width = '70%';
    modalContent.style.borderRadius = '.75rem';
    return modalContent;
}

function createCloseModal() {
    const closeModal = document.createElement('span');
    closeModal.innerHTML = '&times;';
    closeModal.style.cursor = 'pointer';
    closeModal.style.float = 'right';
    closeModal.style.fontSize = '28px';
    closeModal.style.fontWeight = 'bold';
    return closeModal;
}

function createIframeContainer() {
    const iframeContainer = document.createElement('div');
    iframeContainer.id = 'iframeContainer';
    return iframeContainer;
}

function createIframe(src) {
    const iframe = document.createElement('iframe');
    iframe.id = 'iframe';
    iframe.src = src; // Przekazujemy źródło jako parametr
    iframe.style.width = '100%';
    iframe.style.height = '500px';
    iframe.style.border = 'none';
    return iframe;
}

function adjustIframeSize(iframe) {
    try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDocument) {
            const contentWidth = iframeDocument.body.scrollWidth;
            iframe.style.width = contentWidth + 'px';
            modalContent.style.width = contentWidth + 'px';
        }
    } catch (e) {
        console.error('Error adjusting iframe size:', e);
    }
}

function checkAndHideIframeElements(iframe, background, iframeContainer) {
    const checkIframeLoaded = setInterval(() => {
        try {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDocument) {
                const cancelBtn = iframeDocument.getElementById('dlgButton_319_');
                const topNav = iframeDocument.getElementById('renderTopNavFixedWidthV12');
                const adminBreadcrumbs = iframeDocument.getElementById('admin-breadcrums');
                const metaDataHeader = iframeDocument.getElementById('4__metaDataHeader');
                const searchBarContainer = iframeDocument.getElementById('4__searchBarContainer');

                // Hide elements if they exist
                [topNav, adminBreadcrumbs, metaDataHeader, searchBarContainer].forEach(el => {
                    if (el) el.style.display = 'none';
                });

                // Add event listener to cancel button if it exists
                if (cancelBtn) {
                    cancelBtn.addEventListener('click', () => {
                        background.style.display = 'none';
                        iframeContainer.innerHTML = '';
                    });
                    clearInterval(checkIframeLoaded); // Clear interval when button is found
                }
            }
        } catch (e) {
            console.error('Cannot find element to hide', e);
            clearInterval(checkIframeLoaded); // Clear interval in case of error
        }
    }, 300);
}

function handleCloseModalClick(background, iframeContainer) {
    background.style.display = 'none';
    iframeContainer.innerHTML = '';
}

function setupAcceptButtonListener(iframe, background, iframeContainer) {
    const checkButtonListeners = setInterval(() => {
        try {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDocument && iframeDocument.getElementById('335__dialogBox')) {
                const buttons = iframeDocument.querySelectorAll('.globalPrimaryButton');
                if (buttons.length > 0) {
                    addClickListenerToButtons(buttons, background, iframeContainer);
                }
            }
        } catch (e) {
            console.error('Cannot add listener', e);
            clearInterval(checkButtonListeners); // Clear interval in case of error
        }
    }, 300);
}

function addClickListenerToButtons(buttons, background, iframeContainer) {
    buttons.forEach(button => {
        button.addEventListener('click', () => handleCloseModalClick(background, iframeContainer));
    });
}

function handleWindowClick(event, background, iframeContainer) {
    if (event.target === background) {
        handleCloseModalClick(background, iframeContainer);
    }
}

//start script
createModal();
