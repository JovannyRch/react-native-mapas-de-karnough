import useStore from "@/app/store";
import React, { useMemo } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import HTML from "react-native-render-html";

//TODO: Refactor this component

export const CircuitComponent = React.memo(() => {
  const { resultType, variableQuantity, circuitVector: groups } = useStore();

  const isMaxiterm = resultType === "POS";
  const variables = useMemo(() => {
    if (variableQuantity === 2) return ["A", "B"];
    if (variableQuantity === 3) return ["A", "B", "C"];
    if (variableQuantity === 4) return ["A", "B", "C", "D"];
  }, [variableQuantity]);

  const addNegations = (vars) => {
    let result = [];
    for (let v of vars) {
      result.push(v);
      result.push(v + "'");
    }

    return result;
  };
  let vars = addNegations(variables);
  const n = vars.length;
  let height = n * 8;
  console.log("groups", groups);
  let joiner = isMaxiterm ? "+" : ".";
  console.log("groups", groups);
  let dy = 0;
  const step = 13;
  const stepy = 15;
  let decresingX = true;
  let lg = groups.length;
  let middles = lg % 2 == 0 ? [lg / 2 - 1, lg / 2] : [Math.floor(lg / 2)];
  let incresingValue = (n / 3) * (step * 0.5);

  //Almacena las posiciones de las salidas de los ands, para unirlos con el OR
  let mapsXY = {};
  let color = "#2f4858";

  const setVariables = (vars, group, index) => {
    let formatGroup = group.split(" ").join("").split(joiner);

    let dx = 10;

    let initAnd = n * step + 40;

    let result = ``;
    for (let i = 0; i < n; i++) {
      let v = vars[i];
      // Lineas verticales que inician el circuito con las variables (1)
      result += `
                <div  style="position: absolute;top: ${dy}px;left:${dx}px;"><b>${v}</b></div>
                <div style="position: absolute;top: ${
                  dy + stepy
                }px;left:${dx}px;width: 2px; height: ${height}px; background-color: ${color};"></div>
         `;

      //Lineas horizontales que van del inicio de las variables a la compuerta AND
      if (formatGroup.indexOf(v) >= 0) {
        result += `
                            <div style="position: absolute;top: ${
                              dy + stepy + (height / n) * i + 7
                            }px;left:${
          dx - 2
        }px;width: 10px; height: ${10}px; background-color: ${color};border-radius: 100px;"></div>
                            <div style="position: absolute;top: ${
                              dy + stepy + (height / n) * i + 10
                            }px;left:${dx}px;width: ${
          initAnd - dx
        }px; height: ${3}px; background-color: ${color};"></div>
                    `;

        if (formatGroup.length == 1) {
          let y1 = (height / n) * i + 13;
          let y2 = height / 2;
          let h;
          if (y1 > y2) {
            h = y1 - y2;

            result += `
                                <div style="position: absolute;top: ${
                                  dy + stepy + height / 2
                                }px;left:${initAnd}px;width: ${3}px; height: ${h}px; background-color: ${color};z-index: 3;"></div>
                            `;
          } else {
            h = height / 2 - ((height / n) * i + 10);
            result += `
                                <div style="position: absolute;top: ${
                                  dy + stepy + (height / n) * i + 10
                                }px;left:${initAnd}px;width: ${3}px; height: ${h}px; background-color: ${color};z-index: 3;"></div>
                            `;
          }
          result += `<div style="position: absolute;top: ${
            dy + stepy + height / 2
          }px;left:${initAnd}px;width: ${
            height * 1
          }px; height: ${3}px; background-color: ${color};z-index: 3;"></div>`;
        }
      }

      dx += step;
    }

    if (formatGroup.length > 1) {
      if (!isMaxiterm) {
        //OR Operator
        result += `<div style="position: absolute;top: ${
          dy + stepy
        }px;left:${initAnd}px;width: ${height}px; height: ${
          height * 1.3
        }px; background-color: ${color};border-top-right-radius: 50%;border-bottom-right-radius: 50%;z-index:2;"></div>`;
      } else {
        //AND OPERATOR
        result += `
                <div style="position: absolute;top: ${dy + stepy}px;left:${
          initAnd - height
        }px;width: ${height * 1.05}px; height: ${
          height * 1.3
        }px; background-color: #f0f2f2;border-radius: 40%;z-index: -1;"></div>                 
                <div style="position: absolute;top: ${dy + stepy}px;left:${
          initAnd - height / 2
        }px;width: ${height * 1.1}px; height: ${
          height * 1.3
        }px; background-color: ${color};border-top-right-radius: 100%;border-bottom-right-radius: 100%;z-index: -2;"></div>                  
                <div style="position: absolute;top: ${
                  dy + stepy + height / 2
                }px;left:${initAnd + height / 2}px;width: ${
          height * 0.6
        }px; height: ${3}px; background-color: ${color};border-top-right-radius: 100%;border-bottom-right-radius: 100%;z-index: -2;"></div>                  
            `;
      }
    }

    //Salida del operador AND
    result += `
              <div style="position: absolute;top: ${
                dy + stepy + height / 2
              }px;left:${
      initAnd + height
    }px;width: ${incresingValue}px; height: 3px; background-color: ${color};"></div>
              `;
    mapsXY[index] = {
      x: initAnd + height + incresingValue,
      y: dy + stepy + height / 2,
    };
    if (middles.indexOf(index) == 0) {
      decresingX = false;
      if (middles.length == 1) {
        incresingValue += step;
      }
    }

    if (middles.indexOf(index) == -1) {
      if (decresingX) {
        incresingValue -= step;
      } else {
        incresingValue += step;
      }
    }

    result += ` `;
    dy += height + 40;
    return result;
  };

  console.log(middles);
  let htmlContent = `<div style="position: relative;top: 0px;height: ${
    height * lg * 1.4
  };  overflow-x: scroll;">`;
  for (let i in groups) {
    let g = groups[i];
    htmlContent += setVariables(vars, g, parseInt(i));
  }
  //console.log(mapsXY);
  //console.log(middles);
  let middleValueY =
    middles.length == 2
      ? (mapsXY[middles[1]].y - mapsXY[middles[0]].y) / 2 + mapsXY[middles[0]].y
      : mapsXY[middles[0]].y;
  //console.log(middleValueY);
  //htmlContent += `<div style="position: absolute; top: ${middleValueY}px;left:${initOr};background-color: ${color}; width: 100px; height: 3px;" ></div>`

  //Conectores de las salidas de la compuerta AND a la compuerta or
  let posXOr = -1;
  for (var key in mapsXY) {
    const y = mapsXY[key].y;
    const x = mapsXY[key].x;
    if (posXOr == -1) posXOr = x + step * 2;
    if (y > middleValueY) {
      //Hacia arriba
      htmlContent += `
            <div style="position: absolute; top: ${
              middleValueY + 5
            }px;left:${x};background-color: ${color}; width: 3px; height: ${
        y - middleValueY - 2
      }px;z-index: 3;" ></div>
            <div style="position: absolute; top: ${
              middleValueY + 5
            }px;left:${x};background-color: ${color}; width: ${
        posXOr - x + height * 0.05
      }px; height: ${3}px;z-index: 3;" ></div>
            `;
    } else if (y < middleValueY) {
      //Hacia abajo
      htmlContent += `
            <div style="position: absolute; top: ${y}px;left:${x};background-color: ${color}; width: 3px; height: ${
        middleValueY - y - 5
      }px;z-index: 3;" ></div>
            <div style="position: absolute; top: ${
              middleValueY - 5
            }px;left:${x};background-color: ${color}; width: ${
        posXOr - x + height * 0.05
      }px; height: 3px;z-index: 3;" ></div>
            `;
    } else {
      //Ahi quedate
      htmlContent += `
            <div style="position: absolute; top: ${y}px;left:${x};background-color: ${color}; width: ${
        posXOr - x + height * 0.05
      }px; height: 3px;z-index: 3;" ></div>
            `;
    }
  }

  //OR OPERATOR
  let yOr;
  if (middles.length == 1) {
    yOr = mapsXY[middles[0]].y;
  } else if (middles.length == 2) {
    const y1 = mapsXY[middles[0]].y;
    const y2 = mapsXY[middles[1]].y;
    yOr = y1 + (y2 - y1) / 2;
  }
  //Dibujo del operador OR
  if (groups.length > 1) {
    if (!isMaxiterm) {
      htmlContent += `
        <div style="position: absolute;top: ${yOr - height / 2}px;left:${
        posXOr - height / 1
      }px;width: ${
        height * 1.05
      }px; height: ${height}px; background-color: #f0f2f2;border-radius: 40%;z-index: 1;"></div>                 
        <div style="position: absolute;top: ${yOr - height / 2}px;left:${
        posXOr - height / 2
      }px;width: ${height}px; height: ${height}px; background-color: ${color};border-top-right-radius: 100%;border-bottom-right-radius: 100%;z-index: -1;"></div>                  
        <div style="position: absolute;top: ${yOr}px;left:${
        posXOr + height / 2
      }px;width: ${
        height * 0.25
      }px; height: ${3}px; background-color: ${color};border-top-right-radius: 100%;border-bottom-right-radius: 100%;z-index: -1;"></div>                  
    `;
    } else {
      htmlContent += `<div style="position: absolute;top: ${
        yOr - height / 2
      }px;left:${posXOr}px;width: ${
        height * 0.75
      }px; height: ${height}px; background-color: ${color};border-top-right-radius: 50%;border-bottom-right-radius: 50%;z-index:2;"></div>
            <div style="position: absolute;top: ${yOr}px;left:${
        posXOr + height / 2
      }px;width: ${
        height * 0.5
      }px; height: ${3}px; background-color: ${color};border-top-right-radius: 100%;border-bottom-right-radius: 100%;z-index: -1;"></div>                  
 
            `;
    }
  }

  htmlContent += `</div>`;

  return (
    <ScrollView>
      <View style={styles.circuitContainer}>
        <HTML html={htmlContent} />
      </View>
      <View style={{ height: 200 }}></View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  circuitContainer: {
    padding: 20,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
});
