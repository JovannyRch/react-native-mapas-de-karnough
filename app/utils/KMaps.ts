import { BoxColor, Position } from "../types/types";

export class KMaps {
  squares: (number | string)[][][];
  typeMap: number;
  typeSol: "SOP" | "POS";
  result: string;
  mathExpression: string;
  groups: Position[][];
  borderWidth: number;
  boxColors: BoxColor[];

  constructor(
    typeMap: number,
    typeSol: "SOP" | "POS",
    squares: (number | string)[][][]
  ) {
    this.typeMap = typeMap;
    this.typeSol = typeSol;
    this.squares = squares;
    this.result = "";
    this.mathExpression = "";
    this.groups = [];
    this.borderWidth = 5;
    this.boxColors = [];
  }

  Algorithm() {
    var dimCol, dimRig;
    let val = this.typeSol === "SOP" ? 1 : 0;

    if (this.typeMap === 4) {
      dimCol = 4;
      dimRig = 4;
    } else if (this.typeMap === 3) {
      dimCol = 4;
      dimRig = 2;
    } else {
      dimCol = 2;
      dimRig = 2;
    }

    var groups = new Array(dimRig); //creo le righe

    for (let i = 0; i < dimRig; i++) {
      groups[i] = new Array(dimCol); //creo le colonne

      for (let j = 0; j < dimCol; j++) groups[i][j] = []; //per ogni cella creo un array
    }

    var index = 0; // per indicare i vari gruppi(temporanei);
    for (let i = 0; i < dimRig; i++) {
      for (let j = 0; j < dimCol; j++) {
        var count = 0; // mi conta quanti elementi ho trovato(temporaneamente), serve per vedere se è una potenza del 2

        if (this.squares[i][j][0] === val) {
          //squares[i][j] è l'elemento selezionato
          //Lascio invariato il valore di i ed j
          var TempI = i;
          var TempJ = j;

          if (j === dimCol - 1) {
            //mi trovo nell'ultima colonna, faccio i controlli per i bordi
            let ok = true;
            let count2 = 0;

            for (let altezza = i; altezza < dimRig && ok; altezza++)
              if (
                this.squares[altezza][dimCol - 1][0] === val &&
                this.squares[altezza][0][0] === val
              ) {
                groups[altezza][0].push(index);
                groups[altezza][dimCol - 1].push(index);
                count2++;
              } else ok = false;

            if (count2 > 0) {
              index++;

              if (!this.isPower(2, count2)) {
                groups[i + count2 - 1][0].pop();
                groups[i + count2 - 1][dimCol - 1].pop();
              }
            }
          }

          if (i === dimRig - 1) {
            //mi trovo nell'ultima riga, faccio i controlli per i bordi
            let ok = true;
            let count2 = 0;

            for (let colonna = j; colonna < dimCol && ok; colonna++)
              if (
                this.squares[dimRig - 1][colonna][0] === val &&
                this.squares[0][colonna][0] === val
              ) {
                groups[dimRig - 1][colonna].push(index);
                groups[0][colonna].push(index);
                count2++;
              } else ok = false;

            if (count2 > 0) {
              index++;

              if (!this.isPower(2, count2)) {
                groups[dimRig - 1][j + count2 - 1].pop();
                groups[0][j + count2 - 1].pop();
              }
            }
          }

          do {
            //Controllo le caselle orizzontali ad esso
            groups[TempI][TempJ].push(index); //Indico che ho trovato un gruppo collegato con l'elemento selezionato
            count++;
            TempJ++;
          } while (TempJ < dimCol && this.squares[TempI][TempJ][0] === val);
          //ATTENZIONE: MANCA IL CONTROLLE PER LE CASELLE AI BORDI

          if (!this.isPower(2, count)) {
            //count è una potenza del 2 ?
            groups[TempI][TempJ - 1].pop(); //elimino l'ultimo elemento inserito
            count--;
          }

          var CountVer;
          var depth = 100; //mi indica quante righe sono valide della colonna dell'elemento selezionato
          var isOk = true; // Serve a controllare se vi è una interruzione di una colonna
          for (let spostamento = 0; spostamento < count; spostamento++) {
            //per ogni colonna
            TempI = i + 1;
            TempJ = j + spostamento;
            CountVer = 1;

            while (TempI < dimRig && CountVer < depth) {
              if (this.squares[TempI][TempJ][0] !== val) {
                if (spostamento !== 0 && CountVer !== depth) {
                  //serve ad evitare squilibri inutili all'intero dei gruppi, mi permette di "marchiare" gruppi effettivamente utilizzabili.

                  var rig = TempI;
                  if (!this.isPower(2, spostamento)) {
                    //nel caso di una matrice 4x4 solo se spo=3
                    //Necessario perchè fino a questo punto non sapevo se il gruppo che stavo creando fosse effettivamente valido o meno, visto che sono entrato qui dentro
                    //devo eliminare SOLO i gruppi creati non più validi

                    if (!this.isPower(2, CountVer))
                      //bisogna avere il riferimento dell'altezza rispetto l'elemento selezionato
                      rig--;

                    groups[TempI][TempJ].push(index); //evito di mettere dei controlli nei cicli di sotto, non posso eliminare qualcosa che non ho inserito.

                    if (TempI >= depth)
                      //in base dove mi trovo, dovrò basarmi sull'altezza del gruppo(depth) oppure sull'altezza in cui mi trovo.
                      depth = TempI;
                    else depth--;

                    for (; rig <= depth; rig++)
                      for (let col = TempJ - 1; col <= spostamento; col++)
                        groups[rig][col].pop();

                    isOk = false; // per il controllo di sotto
                  }
                }
                break;
              }
              groups[TempI][TempJ].push(index);
              TempI++;
              CountVer++;
            }

            if (CountVer < depth) depth = CountVer;

            if (!this.isPower(2, CountVer) && isOk) {
              //essendo che ho già "ripulito" quando ho settato isOk a falso, non ho bisogno di rifarlo
              groups[TempI - 1][TempJ].pop();
              depth--;
            }
          }
          index++;
        }
      }
    }
    this.GroupUp(JSON.parse(JSON.stringify(groups)));
  }

  GroupUp(values: number[][][]) {
    var groups = [];

    var group1 = [];
    var group2 = [];
    var obj1, obj2;
    var dimCol, dimRig;
    let val = this.typeSol === "SOP" ? 1 : 0;

    if (this.typeMap === 4) {
      dimCol = 4;
      dimRig = 4;
    } else if (this.typeMap === 3) {
      dimCol = 4;
      dimRig = 2;
    } else {
      dimCol = 2;
      dimRig = 2;
    }

    if (
      this.squares[0][0][0] === val &&
      this.squares[0][dimCol - 1][0] === val &&
      this.squares[dimRig - 1][0][0] === val &&
      this.squares[dimRig - 1][dimCol - 1][0] === val
    ) {
      obj1 = {
        riga: 0,
        col: 0,
      };

      group1.push(obj1);

      obj1 = {
        riga: 0,
        col: dimCol - 1,
      };

      group1.push(obj1);

      obj1 = {
        riga: dimRig - 1,
        col: 0,
      };

      group1.push(obj1);

      obj1 = {
        riga: dimRig - 1,
        col: dimCol - 1,
      };

      group1.push(obj1);

      groups.push(group1);

      group1 = [];
    }

    for (let i = 0; i < dimRig; i++) {
      for (let j = 0; j < dimCol; j++) {
        if (this.squares[i][j][0] === val) {
          //squares[i][j] è l'elemento selezionato

          var index = values[i][j][0];
          var InizioRiga = i;
          var InizioCol = j;

          if (j === dimCol - 1) {
            while (
              InizioRiga < dimRig &&
              values[InizioRiga][j][0] === index &&
              values[InizioRiga][0][0] === index
            ) {
              obj1 = {
                riga: InizioRiga,
                col: 0,
              };

              obj2 = {
                riga: InizioRiga,
                col: j,
              };

              values[InizioRiga][j].shift();
              values[InizioRiga][0].shift();

              group1.push(obj1);
              group1.push(obj2);

              InizioRiga++;
            }

            if (group1.length > 0) {
              groups.push(group1);
              group1 = [];
              index = values[i][j][0];
            }

            InizioRiga = i;
            InizioCol = j;
          }

          if (i === dimRig - 1) {
            while (
              InizioCol < dimCol &&
              values[i][InizioCol][0] === index &&
              values[0][InizioCol][0] === index
            ) {
              obj1 = {
                riga: i,
                col: InizioCol,
              };

              obj2 = {
                riga: 0,
                col: InizioCol,
              };

              values[0][InizioCol].shift();
              values[i][InizioCol].shift();

              group1.push(obj1);
              group1.push(obj2);

              InizioCol++;
            }

            if (group1.length > 0) {
              group1.sort(function (a, b) {
                return a.riga - b.riga;
              }); //faccio un ordinamento per dimensione
              groups.push(group1);
              group1 = [];
              index = values[i][j][0];
            }

            InizioRiga = i;
            InizioCol = j;
          }

          while (
            InizioCol < dimCol &&
            values[InizioRiga][InizioCol][0] === index
          )
            InizioCol++;

          while (
            InizioRiga < dimRig &&
            values[InizioRiga][InizioCol - 1][0] === index
          )
            InizioRiga++;

          for (let FineRiga = i; FineRiga < InizioRiga; FineRiga++)
            for (let FineCol = j; FineCol < InizioCol; FineCol++) {
              obj1 = {
                riga: FineRiga,
                col: FineCol,
              };
              group1.push(obj1);
            }

          groups.push(group1);

          InizioRiga = i;
          InizioCol = j;

          while (
            InizioRiga < dimRig &&
            values[InizioRiga][InizioCol][0] === index
          )
            InizioRiga++;

          while (
            InizioCol < dimCol &&
            values[InizioRiga - 1][InizioCol][0] === index
          )
            InizioCol++;

          for (let FineRiga = i; FineRiga < InizioRiga; FineRiga++)
            for (let FineCol = j; FineCol < InizioCol; FineCol++) {
              obj1 = {
                riga: FineRiga,
                col: FineCol,
              };
              group2.push(obj1);
            }

          var equal = true;
          if (group1.length === group2.length) {
            for (let v = 0; v < group1.length && equal; v++)
              if (
                group1[v].riga !== group2[v].riga &&
                group1[v].col !== group2[v].col
              )
                equal = false;
          } else groups.push(group2);

          if (!equal) groups.push(group2);

          group1 = [];
          group2 = [];

          for (let k = 0; k < dimRig; k++)
            for (let z = 0; z < dimCol; z++)
              if (values[k][z][0] === index) values[k][z].shift();
        }
      }
    }
    this.CleanAlgorithm(JSON.parse(JSON.stringify(groups)));
  }

  CleanAlgorithm(groups: any[][][]) {
    groups.sort(function (a, b) {
      return a.length - b.length;
    }); //faccio un ordinamento per dimensione
    groups.reverse(); //inverto l'ordine, in modo tale da avere quelli più "grandi" di sopra

    var temp = JSON.parse(JSON.stringify(groups));

    for (let i = 0; i < temp.length; i++) {
      //for che mantiene il punto del gruppo i
      for (let j = i + 1; j < temp.length; j++) {
        //for che scorre i gruppi successivi da confrontare con il gruppo i

        if (temp[i].length < temp[j].length) {
          //Controllo se il gruppo i considerato è maggiore del gruppo j, se non lo è
          let p = i; //fa uno swap in modo da far scendere il gruppo considerato finché non ne trova un altro con dimensione minore o uguale
          while (temp[p].length < temp[p + 1].length) {
            //Effettivo swap.
            let t = temp[p]; //Faccio ciò in modo tale che i gruppi maggiori vengano sempre confrontati con i gruppi minori,
            temp[p] = temp[p + 1]; //in modo da azzerarli se essi risultano interni ad un altro gruppo
            temp[p + 1] = t;

            t = groups[p]; //scambio di posizione anche nel gruppo principale
            groups[p] = groups[p + 1];
            groups[p + 1] = t;
          }
        }

        for (let k = 0; k < temp[i].length; k++) {
          //for che si occupa di scorrere le celle del gruppo i
          for (
            let l = 0;
            l < temp[j].length;
            l++ //for che si occupa di scorrere le celle del gruppo j, in modo da compararle con quelle del gruppo i
          )
            if (
              temp[i][k].riga === temp[j][l].riga &&
              temp[i][k].col === temp[j][l].col
            ) {
              //se ne trova una in entrambi i gruppi
              for (let p = l; p < temp[j].length - 1; p++)
                temp[j][p] = temp[j][p + 1]; //fa uno shift degli elementi fino alla fine del gruppo ( in modo da eliminare la cella nel gruppo j)
              delete temp[j][temp[j].length - 1]; //cancella l'ultima cella dal vettore
              temp[j].length--; //riduco la dimensione del vettore j considerato
            }
        }
      }
    }

    let trovato, eliminato, obj1: any, value;
    for (let v = 0; v < groups.length; v++) {
      eliminato = true;
      if (temp[v].length > 0)
        for (let index = 0; index < groups[v].length && eliminato; index++) {
          obj1 = groups[v][index];
          trovato = false;
          for (let k = 0; k < groups.length && !trovato; k++) {
            if (v !== k && temp[k].length > 0) {
              value = groups[k].findIndex(
                (obj2) => obj1.riga === obj2.riga && obj1.col === obj2.col
              );
              if (value !== -1) trovato = true;
            }
          }

          if (trovato === false) eliminato = false;
        }

      if (eliminato === true)
        //significa che ogni oggetto di groups[v] è stato trovato.
        temp[v] = [];
    }

    //this.groups = { ...groups };
    this.Solution(temp, groups);

    console.log("temp", temp);
    console.log("groups", groups);

    this.drawGroup(temp, groups);
  }

  Solution(temp: any, groups: any) {
    //temp è un array con le coordinate dei gruppi corretti
    const matrice = this.squares; //matrice principale
    var alp = ["A", "B", "C", "D"]; //array con i nomi delle variabili della matrice
    var soluzione = ""; //stringa per calcolare la soluzione di un gruppo
    var soluzione2 = ""; //stringa per calcolare la soluzione di un gruppo
    var vettoreSol = []; //ogni elemento è la soluzione di un gruppo
    var vettoreSol2 = []; //ogni elemento è la soluzione di un gruppo
    var k, j, t;
    //k è l'indice per scorrere l'array alp, j è l'indice per scorrere le coordinate dei gruppi, t è l'indice per scorrere le coordinate binarie
    var elementoR, elementoC; //queste due variabili contengono la Riga e la Colonna del primo elemento di un gruppo, che è il punto di riferimento
    var flag; //variabile sentinella
    let coord: string; //variabile che contiene la coordinata binaria in uso
    var ner;
    var tipoSol = this.typeSol;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].length > 0) {
        k = 0;
        elementoR = groups[i][0].riga; //estrazione coordinate del punto di riferimento per ogni gruppo
        elementoC = groups[i][0].col;

        ner = 0;
        while (ner < groups[i].length && groups[i][ner].riga === elementoR) {
          //contatore che indica il numero di elementi in una riga (usato per le colonne)
          ner++;
        }

        //INIZIO CONTROLLO DELLA RIGA
        t = 0;
        coord = matrice[elementoR][elementoC][1]; //coord contiene la coordinata binaria nella colonna del punto di riferimento
        while (t < coord.length) {
          j = 1;
          flag = true;
          while (j < groups[i].length && groups[i][j].riga === elementoR) {
            //finchè gli elementi si trovano sulla stessa riga
            if (
              coord.charAt(t) !==
              matrice[elementoR][groups[i][j].col][1].charAt(t)
            ) {
              //controlla i singoli caratteri delle coordinate binarie nelle colonne degli elementi appartenenti al gruppo
              flag = false; //se trova che i caratteri sono diversi, la variabile non viene considerata e si esce dal ciclo
              break;
            }
            j++;
          }
          if (flag) {
            //viene aggiornata la soluzione solo se i caratteri risultano tutti uguali
            if (tipoSol === "SOP") {
              //forma SOP
              if (coord.charAt(t) === "0") {
                soluzione += "'" + alp[k];
                soluzione2 += alp[k] + "\u0305";
              } else {
                soluzione += alp[k];
                soluzione2 += alp[k];
              }
            } else {
              //forma POS
              if (coord.charAt(t) === "0") {
                soluzione += alp[k];
                soluzione2 += alp[k];
              } else {
                soluzione += "'" + alp[k];
                soluzione2 += alp[k] + "\u0305";
              }
              soluzione += "+";
              soluzione2 += "+";
            }
          }
          k++;
          t++;
        }

        //INIZIO CONTROLLO DELLA COLONNA
        t = 0;
        coord = matrice[elementoR][elementoC][2]; //coord contiene la coordinata binaria nella riga del punto di riferimento
        while (t < coord.length) {
          j = ner;
          flag = true;
          while (j < groups[i].length && groups[i][j].col === elementoC) {
            //finchè gli elementi si trovano sulla stessa colonna
            if (
              coord.charAt(t) !==
              matrice[groups[i][j].riga][elementoC][2].charAt(t)
            ) {
              //controlla i singoli caratteri delle coordinate binarie nelle righe degli elementi appartenenti al gruppo
              flag = false; //se trova che i caratteri sono diversi, la variabile non viene considerata e si esce dal ciclo
              break;
            }
            j += ner;
          }
          if (flag) {
            //viene aggiornata la soluzione solo se i caratteri risultano tutti uguali
            if (tipoSol === "SOP") {
              //forma SOP
              if (coord.charAt(t) === "0") {
                soluzione += "'" + alp[k];
                soluzione2 += alp[k] + "\u0305";
              } else {
                soluzione += alp[k];
                soluzione2 += alp[k];
              }
            } else {
              //forma POS
              if (coord.charAt(t) === "0") {
                soluzione += alp[k];
                soluzione2 += alp[k];
              } else {
                soluzione += "'" + alp[k];
                soluzione2 += alp[k] + "\u0305";
              }
              soluzione += "+";
              soluzione2 += "+";
            }
          }
          k++;
          t++;
        }
        if (tipoSol === "POS") {
          //in forma POS si avrà un "+" a fine stringa e viene eliminato
          soluzione = soluzione.substr(0, soluzione.length - 1);
          soluzione2 = soluzione2.substr(0, soluzione2.length - 1);
        }
        vettoreSol.push(soluzione);
        vettoreSol2.push(soluzione2);
        soluzione = "";
        soluzione2 = "";
      }
    }

    if (vettoreSol[0] === "" || !vettoreSol[0]) {
      //se la soluzione è stringa vuota allora la matrice è formata da tutti 0 o da tutti 1
      if (matrice[0][0][0] === 0) {
        vettoreSol[0] = "0";
        vettoreSol2[0] = "0";
      } else {
        vettoreSol[0] = "1";
        vettoreSol2[0] = "1";
      }
    }
    this.result = vettoreSol.join(this.typeSol === "SOP" ? " + " : " · ");
    this.mathExpression = vettoreSol2.join(
      this.typeSol === "SOP" ? " + " : " · "
    );
    /* this.drawSolution(vettoreSol); */
  }

  isPower(x: number, y: number) {
    if (x === 1) return y === 1;

    var pow = 1;
    while (pow < y) pow *= x;

    return pow === y;
  }

  drawGroup(temp: any, groups: any) {
    let color = [
      "red",
      "blue",
      "green",
      "orange",
      "#50C878",
      "lightblue",
      "#CD7F32",
      "#ff6699",
    ]; //array dei colori
    let c = -1; //usato per identificare i singoli div per il quale poi verranno eliminati, indica anche il colore da usare

    this.boxColors = [];

    for (let i = 0; i < temp.length; i++) {
      if (
        temp[i].length > 0 &&
        groups[i].length !== Math.pow(2, this.typeMap)
      ) {
        c++;
        let j = 0;
        let FirstElCol = groups[i][0].col;
        let FirstElRig = groups[i][0].riga;
        while (j < groups[i].length) {
          const col = groups[i][j].col;
          const row = groups[i][j].riga;

          let element: any = {
            borderColor: color[c],
          };

          //Valutazione del tipo di elemento secondo quale celle del gruppo gli sono adiacenti e in quale posizione
          let destra = this.checkElInGroups(j, groups[i], "destra");
          let sotto = this.checkElInGroups(j, groups[i], "sotto");
          let sinistra = this.checkElInGroups(j, groups[i], "sinistra");
          let sopra = this.checkElInGroups(j, groups[i], "sopra");

          //  console.log("d: " + destra + " sin: " + sinistra + " sopra: " + sopra + " sotto: " + sotto);

          //valutazione dei casi per poi inserire il nome corretto di classe css che indica il tipo di raggruppamento da disegnare per quella cella
          if (destra) {
            if (sotto) {
              if (sinistra) {
                if (groups[i][j].col === FirstElCol)
                  element = this.addBorder(element, "topLeft");
                else if (
                  j === groups[i].length / 2 - 1 ||
                  j === groups[i].length - 1
                )
                  element = this.addBorder(element, "topRight");
                else element = this.addBorder(element, "top");
              } else if (sopra) {
                if (j === groups[i].length - 2 || j === groups[i].length - 1)
                  element = this.addBorder(element, "bottomLeft");
                else if (groups[i][j].riga === FirstElRig)
                  element = this.addBorder(element, "topLeft");
                else element = this.addBorder(element, "left");
              } else element = this.addBorder(element, "topLeft");
            } else if (sopra) {
              if (sinistra) {
                if (groups[i][j].col === FirstElCol)
                  element = this.addBorder(element, "bottomLeft");
                else if (
                  j === groups[i].length - 1 ||
                  j === groups[i].length / 2 - 1
                )
                  element = this.addBorder(element, "bottomRight");
                else element = this.addBorder(element, "bottom");
              } else element = this.addBorder(element, "bottomLeft");
            } else if (sinistra) {
              if (j === 0) element = this.addBorder(element, "closedLeft");
              else if (j === groups[i].length - 1)
                element = this.addBorder(element, "closedRight");
              else element = this.addBorder(element, "top-bottom");
            } else element = this.addBorder(element, "closedLeft");
          } else if (sopra) {
            if (sinistra) {
              if (sotto) {
                if (groups[i][j].riga === FirstElRig)
                  element = this.addBorder(element, "topRight");
                else if (
                  j === groups[i].length - 1 ||
                  j === groups[i].length - 2
                )
                  element = this.addBorder(element, "bottomRight");
                else element = this.addBorder(element, "right");
              } else element = this.addBorder(element, "bottomRight");
            } else if (sotto) {
              if (j === 0) element = this.addBorder(element, "closedTop");
              else if (j === groups[i].length - 1)
                element = this.addBorder(element, "closedBottom");
              else element = this.addBorder(element, "right-left");
            } else element = this.addBorder(element, "closedBottom");
          } else if (sinistra) {
            if (sotto) element = this.addBorder(element, "topRight");
            else element = this.addBorder(element, "closedRight");
          } else if (sotto) element = this.addBorder(element, "closedTop");
          else element = this.addBorder(element, "monoGroup");
          j++;
          this.boxColors.push({ row, column: col, style: element });
        }
      }
    }
  }

  checkElInGroups(j: number, groups: any[], lato: string) {
    const matrix = this.squares;
    let r = matrix[0].length;
    let c = matrix[0].length;
    if (this.typeMap === 3) {
      r = 2;
      c = 4;
    }
    for (let k = 0; k < groups.length; k++) {
      if (
        lato === "destra" &&
        groups[k].col === (groups[j].col + 1) % c &&
        groups[k].riga === groups[j].riga % r
      )
        return true;
      if (
        lato === "sotto" &&
        groups[k].col === groups[j].col % c &&
        groups[k].riga === (groups[j].riga + 1) % r
      )
        return true;
      if (lato === "sinistra") {
        let col = groups[j].col - 1;
        if (col < 0) col = c - 1;
        if (groups[k].col === col % c && groups[k].riga === groups[j].riga % r)
          return true;
      }
      if (lato === "sopra") {
        let riga = groups[j].riga - 1;
        if (riga < 0) riga = r - 1;
        if (groups[k].col === groups[j].col % c && groups[k].riga === riga % r)
          return true;
      }
    }
    return false;
  }

  addBorder(
    element: object,
    position:
      | "top"
      | "right"
      | "bottom"
      | "left"
      | "topRight"
      | "topLeft"
      | "bottomRight"
      | "bottomLeft"
      | "closedLeft"
      | "closedRight"
      | "closedTop"
      | "closedBottom"
      | "top-bottom"
      | "right-left"
      | "monoGroup"
  ) {
    switch (position) {
      case "top":
        return { ...element, borderTopWidth: this.borderWidth };
      case "right":
        return { ...element, borderRightWidth: this.borderWidth };
      case "bottom":
        return { ...element, borderBottomWidth: this.borderWidth };
      case "left":
        return { ...element, borderLeftWidth: this.borderWidth };
      case "topRight":
        return {
          ...element,
          borderTopWidth: this.borderWidth,
          borderRightWidth: this.borderWidth,
          borderTopRightRadius: 10,
        };
      case "topLeft":
        return {
          ...element,
          borderTopWidth: this.borderWidth,
          borderLeftWidth: this.borderWidth,
          borderTopLeftRadius: 10,
        };
      case "bottomRight":
        return {
          ...element,
          borderBottomWidth: this.borderWidth,
          borderRightWidth: this.borderWidth,
          borderBottomRightRadius: 10,
        };
      case "bottomLeft":
        return {
          ...element,
          borderBottomWidth: this.borderWidth,
          borderLeftWidth: this.borderWidth,
          borderBottomLeftRadius: 10,
        };
      case "closedLeft":
        return {
          ...element,
          borderLeftWidth: this.borderWidth,
          borderTopWidth: this.borderWidth,
          borderBottomWidth: this.borderWidth,
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
        };
      case "closedRight":
        return {
          ...element,
          borderRightWidth: this.borderWidth,
          borderTopWidth: this.borderWidth,
          borderBottomWidth: this.borderWidth,
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10,
        };

      case "closedTop":
        return {
          ...element,
          borderTopWidth: this.borderWidth,
          borderLeftWidth: this.borderWidth,
          borderRightWidth: this.borderWidth,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        };
      case "closedBottom":
        return {
          ...element,
          borderBottomWidth: this.borderWidth,
          borderLeftWidth: this.borderWidth,
          borderRightWidth: this.borderWidth,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        };
      case "top-bottom":
        return {
          ...element,
          borderTopWidth: this.borderWidth,
          borderBottomWidth: this.borderWidth,
        };
      case "right-left":
        return {
          ...element,
          borderRightWidth: this.borderWidth,
          borderLeftWidth: this.borderWidth,
        };
      case "monoGroup":
        return {
          ...element,
          borderWidth: this.borderWidth,
          borderRadius: 10,
        };
      default:
        return element;
    }
  }

  drawSolution(vettoreSol: string[]) {
    //medodo che stampa a video la soluzione proposta
    //$(".Solution").show();

    let costo = 0; //costo dei letterali
    if (vettoreSol[0] === "0" || vettoreSol[0] === "1") {
      //caso nel quale la matrice sia tutta 0 o tutta 1
      //$("#sol").append("<div>" + vettoreSol[0] + "</div>");
      this.result = vettoreSol[0];
    } else {
      const typeSol = this.typeSol;
      let s = typeSol === "SOP" ? "+" : "·"; //inserisce il simbolo a seconda del tipo di risultato scelto
      let cls = typeSol === "SOP" ? "groupSop" : "groupPos"; //stabilisce il css da utilizzare

      //array dei colori, uguale a quello dei gruppi disegnati in modo da identificare dal colore il gruppo corrispondente
      let color = [
        "red",
        "blue",
        "green",
        "orange",
        "#50C878",
        "lightblue",
        "#CD7F32",
        "#ff6699",
      ];

      for (let i = 0; i < vettoreSol.length; i++) {
        //scorre la soluzione, divisa in gruppi
        //inserisce un div del colore corrispondente al gruppo
        /* $("#sol").append(
          "<div id='sol" +
            i +
            "' class='" +
            cls +
            "' style='background-color: " +
            color[i] +
            "'></div>"
        ); */

        for (let j = 0; j < vettoreSol[i].length; j++) {
          //scorre il singolo gruppo della soluzione

          if (vettoreSol[i][j] !== "'") {
            /*  $("#sol" + i).append(vettoreSol[i][j] + " "); */
          }
          //se non è presente ', stampa normalmente il valore
          else {
            //se presente, incrementa l'indice in modo da puntare alla lettera successiva, che verrà negata
            /*  $("#sol" + i).append(
              "<span style='text-decoration: overline'>" +
                vettoreSol[i][++j] +
                "</span> "
            ); */
          }
          if (vettoreSol[i][j] !== "+") costo++; //incrementa il costo dei letterali
        }
        if (i !== vettoreSol.length - 1) {
          /*  $("#sol").append("<div class='plus'> " + s + " </div>"); */
        } //aggiunge il simbolo deciso ad inizio metodo, a seconda del tipo di sol scelto
      }
    }
    /* $("#costo").html("Literal Cost: " + costo);  */ //stampa il costo dei letterali

    //pone la soluzione più o meno centralmente sotto la mappa, in modo da evitare che incrementando il numero di elementi, vada a rovinare il layout
    /*  $(".Solution").css(
      "left",
      parseInt($(".Solution").css("left")) -
        parseInt($(".Solution").css("width")) / 2
    ); */
  }

  getResult() {
    return this.result;
  }

  getMathExpression() {
    return this.mathExpression;
  }

  getGroups(): Position[][] {
    /* console.log("this.groups", this.groups); */
    /* const groups = {
      "0": [
        { col: 2, riga: 1 },
        { col: 3, riga: 1 },
      ],
      "1": [
        { col: 0, riga: 0 },
        { col: 1, riga: 0 },
      ],
      "2": [{ col: 3, riga: 1 }],
      "3": [{ col: 1, riga: 0 }],
    }; */
    return [
      [
        {
          row: 0,
          column: 0,
        },
        {
          row: 0,
          column: 1,
        },
      ],
      [
        {
          row: 1,
          column: 2,
        },
        {
          row: 1,
          column: 3,
        },
      ],
    ];
  }

  getBoxColors() {
    return this.boxColors;
  }
}
