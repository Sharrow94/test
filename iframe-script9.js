function createModal() {
    console.log('1');
    const modal = document.createElement('div');
    modal.id = 'myModal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fefefe';
    modalContent.style.margin = '15% auto';
    modalContent.style.padding = '20px';
    modalContent.style.border = '1px solid #888';
    modalContent.style.width = '80%';

    const closeModal = document.createElement('span');
    closeModal.innerHTML = '&times;';
    closeModal.style.cursor = 'pointer';
    closeModal.style.float = 'right';
    closeModal.style.fontSize = '28px';
    closeModal.style.fontWeight = 'bold';

    const iframeContainer = document.createElement('div');
    iframeContainer.id = 'iframeContainer';

    modalContent.appendChild(closeModal);
    modalContent.appendChild(iframeContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    console.log('custom modal CLICK');
    modal.style.display = 'block';

    const iframe = document.createElement('iframe');
    iframe.id = 'iframe';
    iframe.src = 'https://hcm-eu10-sales.hr.cloud.sap/xi/ui/genericobject/pages/mdf/mdf.xhtml?&#t=cust_adamed&n=1&u=adamed';
    iframe.style.width = '100%';
    iframe.style.height = '400px';
    iframe.style.border = 'none';

    iframeContainer.appendChild(iframe);
    console.log('2');

    const checkIframeLoaded = setInterval(function () {
        try {
            console.log('3');
            const iframeElement = document.getElementById('iframe');
            const iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow.document;

            if (iframeDocument) {
                const sidenavElement = iframeDocument.getElementById('shellbarContainer');
                
                if (sidenavElement) {
                    console.log('4');
                    sidenavElement.style.display = 'none'; 
                    sidenavElement.innerHTML = '';
                    clearInterval(checkIframeLoaded);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }, 100);

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
        iframeContainer.innerHTML = '';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            iframeContainer.innerHTML = '';
        }
    });
}
createModal();
console.log('custom modal END');
