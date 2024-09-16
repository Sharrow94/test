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

    console.log('custom modal CLICK');
    modal.style.display = 'block';

    const iframe = document.createElement('iframe');
    iframe.id = 'iframe';
    iframe.src = 'https://hcm-eu10-sales.hr.cloud.sap/xi/ui/genericobject/pages/mdf/mdf.xhtml?&#t=cust_adamed&n=1&u=adamed';
    iframe.style.width = '100%';  // Początkowa szerokość iframe
    iframe.style.height = '400px';  // Początkowa wysokość iframe
    iframe.style.border = 'none';

    iframeContainer.appendChild(iframe);
    console.log('2');

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
            }
        } catch (e) {
            console.log('Error adjusting iframe size:', e);
        }
    };

    const checkIframeLoaded = setInterval(function () {
        try {
            console.log('3');
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            console.log(iframeDocument);
            if (iframeDocument) {
                console.log('3.14');
                const sidenavElement = iframeDocument.getElementById('renderTopNavFixedWidthV12');
                
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
console.log('custom modal END');
