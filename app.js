(function() {
    function initGame(gameDiv, width, height) {
    
    
        gameDiv.style.setProperty('--cell-count', width);
    
        gameDiv.innerHTML = "";
        let counter=0;
        let chet=0;
		var bombMap;
		var click=0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let cell = document.createElement('div');
                let adres=y*8+x;
                let adres2=String(adres)+"kletka";
                cell.className = adres2;
                /*cell.classList.add("cell1");*/
                cell.classList.add("cell");
                gameDiv.append(cell);
            }
        }
        /*cell.classList.add("cell1");*/
        /*for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (!(bombMap[x][y])) {
                    let adres=y*8+x;
                    let adres2=String(adres);
                    var element = document.getElementsByClassName('adres2');
                    elements.content=1;
                }
                
            }
    
        }*/
		document.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				location.reload();
			}
		});
        gameDiv.addEventListener('click', e => {
			let cell = e.target;
			if (click===0){
				let addr=0;
				for (let y = 0; y < height; y++) {
            		for (let x = 0; x < width; x++) {
						let adres=y*8+x;
                  		let adres2=String(adres)+"kletka";
                		if (cell.classList.contains(adres2)){
							addr=String(adres);
						}
					}
            	}
				bombMap = makeBombs(10, width, height,addr);
				for (let y = 0; y < height; y++) {
            		for (let x = 0; x < width; x++) {
		                if (bombMap[x][y]) {
							click++;
		                }
            		}
        		}
				
    			var elem = document.getElementsByClassName('bom')[0];
        		let all_bombs=String(click);
				elem.textContent="БОМБ -"+all_bombs;
				
        	}
            if (cell.matches(".cell") && !cell.classList.contains('cell--marked')) {
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        let adres=y*8+x;
                        let adres2=String(adres)+"kletka";
                        if (cell.classList.contains(adres2)){
                            if (bombMap[x][y]){
								alert("Вась, что не так??");
								var elem = document.getElementsByClassName('bom')[0];
								elem.textContent="Нажми Enter";
								for (let u = 0; u < height; u++) {
            						for (let s = 0; s < width; s++) {
                						let adres8=u*8+s;
										let adres9=String(adres8)+"kletka";
										var elem = document.getElementsByClassName(adres9)[0];
										if (bombMap[s][u]){
											elem.classList.add('cell--mined');
										}
										else{
											elem.classList.add('cell--open');
											Proverka(bombMap,s,u,elem)
										}
						            }
        						}
								
                            }
                            else{
								cell.classList.add('cell--open');
								Proverka(bombMap,x,y,cell);
                            }
                        }
                        
    				}
				}
				let win=64;
				for (let u = 0; u < height; u++) {
            		for (let s = 0; s < width; s++) {
                		let adres8=u*8+s;
						let adres9=String(adres8)+"kletka";
						var elem = document.getElementsByClassName(adres9)[0];
						if (elem.classList.contains("cell--open")){
							win-=1;
						}
						else if(bombMap[s][u]){
							win-=1;
						}
					}
        		}
				if (win===0){
					alert("Победа!!");
					var elem = document.getElementsByClassName('bom')[0];
					elem.textContent="Нажми Enter";
				}
			}
        })
    
        gameDiv.addEventListener('contextmenu', e => {
            e.preventDefault();
            let cell = e.target;
            if (cell.matches(".cell") && !cell.classList.contains('cell--open')) {
                cell.classList.toggle('cell--marked');
            }
        })
    }
	function Proverka(bombMap,x,y,cell){
		let i0 = y, j0 = x;
		let chet=0;
        let height = 8;
        let width = 8;
        for (let i = i0 - 1; i <= i0 + 1; ++i) {
	        for (let j = j0 - 1; j <= j0 + 1; ++j) {
	                                        // проверка на выход за границы массива
	                                        // и проверка на то, что обрабатываемая ячейка не равна изначальной ячейке
	        	if (0 <= i && i < height && 0 <= j && j < width && (i != i0 || j != j0)) {
	                                            // любая операция с соседним элементом
	        		if (bombMap[j][i]) {
	        			chet++;
	            	}
	        	}
	        }
        }
		if (chet!=0){
	        let newArr=["blue","green", "red", "darkblue","brown", "turquoise", "black", "white"]
	        cell.textContent=String(chet);
	        cell.style.color=newArr[chet-1];
		}
		
		else{
			for (let i = i0 - 1; i <= i0 + 1; ++i) {
		        for (let j = j0 - 1; j <= j0 + 1; ++j) {
		                                        // проверка на выход за границы массива
		                                        // и проверка на то, что обрабатываемая ячейка не равна изначальной ячейке
		        	if (0 <= i && i < height && 0 <= j && j < width && (i != i0 || j != j0)) {
		                                            // любая операция с соседним элементом
		        		let adres5=i*8+j;
						let adres9=String(adres5)+"kletka";
						var elem = document.getElementsByClassName(adres9)[0];
						if (!elem.classList.contains("cell--open")){
							elem.classList.add('cell--open');
							Proverka(bombMap,j,i,elem);
						}
		        	}
		        }
	        }
		}
	}
    function makeBombs(count, width, height,addr) {
        let bombMap = [];
        let currentCount = 0;

        for (let y = 0; y < height; y++) {
            let row = [];
            for (let x = 0; x < width; x++) {
                if (currentCount < count && Math.random() > 0.8 && y*8+x!=addr) {
                    row.push(1);
                    currentCount += 1;
                }
                else {
                    row.push(0);
                }

            }
            bombMap.push(row);
            
        }
        return bombMap;
    }

    window.addEventListener("DOMContentLoaded", () => {
        initGame(document.getElementById('game'), 8, 8);
    });

})();