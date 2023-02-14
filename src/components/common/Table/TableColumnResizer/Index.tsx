export function resizableGrid(table: any, tableId: any) {
  var row = table.getElementsByTagName("tr")[0],
    cols = row ? row.children : undefined;
  if (!cols) return;

  table.style.overflow = "hidden";

  var tableHeight = table.offsetHeight;

  for (var i = 0; i < cols.length; i++) {
    var div = createDiv(tableHeight);
    cols[i].appendChild(div);
    cols[i].style.position = "relative";
    setListeners(div);
  }

  function setListeners(div: any) {
    var pageX: any,
      curCol: any,
      nxtCol: any,
      curColWidth: any,
      nxtColWidth: any,
      tableWidth: any;

    div.addEventListener("mousedown", function (e: any) {
      tableWidth = document.getElementById(tableId)?.offsetWidth;
      curCol = e.target.parentElement;
      nxtCol = curCol.nextElementSibling;
      pageX = e.pageX;

      var padding = paddingDiff(curCol);

      curColWidth = curCol.offsetWidth - padding;
    });

    div.addEventListener("mouseover", function (e: any) {
      e.target.style.borderRight = "2px solid #0000ff";
    });

    div.addEventListener("mouseout", function (e: any) {
      e.target.style.borderRight = "";
    });

    document.addEventListener("mousemove", function (e) {
      if (curCol) {
        var diffX = e.pageX - pageX;

        if (diffX < 300) {
          curCol.style.width = curColWidth + diffX + "px";
          const table: any = document.getElementById(tableId);
          table.style.width = tableWidth + diffX + "px";
        }
      }
    });

    document.addEventListener("mouseup", function (e) {
      curCol = undefined;
      nxtCol = undefined;
      pageX = undefined;
      nxtColWidth = undefined;
      curColWidth = undefined;
    });
  }
  function createDiv(height: number) {
    var div: any = document.createElement("div");
    div.style.top = 0;
    div.style.right = 0;
    div.style.width = "5px";
    div.style.position = "absolute";
    div.style.cursor = "col-resize";
    div.style.userSelect = "none";
    div.style.height = height + "px";
    return div;
  }

  function paddingDiff(col: any) {
    if (getStyleVal(col, "box-sizing") === "border-box") {
      return 0;
    }
    var padLeft = getStyleVal(col, "padding-left");
    var padRight = getStyleVal(col, "padding-right");
    return parseInt(padLeft) + parseInt(padRight);
  }

  function getStyleVal(elm: any, css: any) {
    return window.getComputedStyle(elm, null).getPropertyValue(css);
  }
}
