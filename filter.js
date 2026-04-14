(function() {
    const ui = document.createElement('div');
    ui.style = "position:fixed;top:10px;left:10px;z-index:10000;background:white;padding:10px;border:2px solid black;border-radius:10px;color:black;";
    ui.innerHTML = `
        <b>Bot Control</b><br>
        Max Price: <input type="number" id="maxP" value="100" style="width:60px;"><br>
        <button id="sBot" style="background:green;color:white;">START</button>
        <button id="tBot" style="background:red;color:white;">STOP</button>
        <div id="stat" style="font-size:10px;">Status: Idle</div>
    `;
    document.body.appendChild(ui);

    let running = false;
    let job = null;

    function hunt() {
        if(!running) return;
        const limit = parseFloat(document.getElementById('maxP').value);
        
        // IMPORTANT: Change '.price' and '.buy-btn' to the real site classes
        const priceTag = document.querySelector('.price'); 
        const buyBtn = document.querySelector('.buy-btn');

        if (priceTag && buyBtn) {
            const currentPrice = parseFloat(priceTag.innerText.replace(/[^0-9.]/g, ''));
            if (currentPrice <= limit) {
                buyBtn.click();
                document.getElementById('stat').innerText = "BOUGHT!";
                stop();
            }
        }
    }

    document.getElementById('sBot').onclick = () => { 
        running = true; 
        document.getElementById('stat').innerText = "Running...";
        job = setInterval(hunt, 50); 
    };
    document.getElementById('tBot').onclick = () => { 
        running = false; 
        clearInterval(job);
        document.getElementById('stat').innerText = "Stopped";
    };
})();
