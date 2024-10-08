function createModal() {
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
    modalContent.style.width = '70%';  // Minimalna początkowa szerokość

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

    modal.style.display = 'block';

    const iframe = document.createElement('iframe');
    iframe.id = 'iframe';
    iframe.src = 'https://hcm-eu10-sales.hr.cloud.sap/xi/ui/genericobject/pages/mdf/mdf.xhtml?&#t=cust_adamed&n=1&u=adamed';
    iframe.style.width = '100%';  // Początkowa szerokość iframe
    iframe.style.border = 'none';

    iframeContainer.appendChild(iframe);

    // Funkcja do dopasowania rozmiaru iframe na podstawie zawartości
    iframe.onload = function () {
        try {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            
            if (iframeDocument) {
                // Obliczanie wysokości i szerokości zawartości iframe
                const contentHeight = iframeDocument.body.scrollHeight;
                const contentWidth = iframeDocument.body.scrollWidth;
                
                // Dopasowanie iframe do wysokości i szerokości zawartości
                iframe.style.height = contentHeight + 'px';
                iframe.style.width = contentWidth + 'px';

                // Dopasowanie modalContent do szerokości iframe
                modalContent.style.width = contentWidth + 'px';
                modalContent.style.height = contentHeight + 'px'; // Dostosowanie wysokości modalContent
            }
        } catch (e) {
            // Obsługa błędów, jeśli wystąpią
        }
    };

    const checkIframeLoaded = setInterval(function () {
        try {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDocument) {
                const sidenavElement = iframeDocument.getElementById('renderTopNavFixedWidthV12');
                
                if (sidenavElement) {
                    sidenavElement.style.display = 'none'; 
                    sidenavElement.innerHTML = '';
                    clearInterval(checkIframeLoaded);
                }
            }
        } catch (e) {
            // Obsługa błędów, jeśli wystąpią
        }
    }, 300);

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
 