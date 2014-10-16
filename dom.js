//Factory pattern for creating dom els
function Dom(){
  var self = this;

  function cssString(styles){
    var tags = [ "BASE",  "BASEFONT",  "BIG",  "BLOCKQUOTE",  "BODY",  "BR",  "B",  "CAPTION",  "CENTER",  "CITE",  "CODE",  "DD",  "DFN",  "DIR",  "DIV",  "DL",  "DT",  "EM",  "FONT",  "FORM",  "H1",  "H2",  "H3",  "H4",  "H5",  "H6",  "HEAD",  "HR",  "HTML",  "IMG",  "INPUT",  "ISINDEX",  "I",  "KBD",  "LINK",  "LI",  "MAP",  "MENU",  "META",  "OL",  "OPTION",  "PARAM",  "PRE",  "P",  "SAMP",  "SCRIPT",  "SELECT",  "SMALL",  "STRIKE",  "STRONG",  "STYLE",  "SUB",  "SUP",  "TABLE",  "TD",  "TEXTAREA",  "TH",  "TITLE",  "TR",  "TT",  "UL",  "U",  "VAR"];

    var str = '';
    for(var style in styles){
      if(has(style.toUpperCase(), tags)) continue;
      str += style.replace(/([A-Z])/, "-$1") + ':' + styles[style] + ';';
    }
    return str;
  }

  function has(prop, arr){
    for(var i=0, j=arr.length; i<j; i++){
      if(prop === arr[i]){
        return true;
      }
    }
    return false;
  }

  this.create = function(type, props){

    var el = document.createElement(type);
    if(props){
      if(props.styles){
        el.style.cssText = cssString(props.styles);
      } 
      if(props.text){
        el.innerText = props.text;
      }
      if(props.html){
        el.innerHTML = props.html;
      }
      for(var prop in props){
        if(prop == "styles" || prop == "html" || prop == "text") continue;
        el[prop] = props[prop];
      }
    }
    return el;
  };

  this.createTable = function(props){

    var theadData = props.thead,
        tbodyData = props.tbody,
        tfootData = props.foot || props.footer;

    // remove so they're not added as properties to the actual element when created
    delete props.thead;
    delete props.tbody;
    delete props.footer;
    delete props.foot;

    var table = this.create("table", props),
        thead = this.create("thead"),
        tbody = this.create("tbody"),
        tfoot = this.create("tfoot"),
        tr = this.create("tr"),
        i, j;

    if(theadData && theadData.length > 0){
      thead.appendChild(tr);

      for(i=0, j = theadData.length; i<j; i++){
        thead.appendChild(this.create("th", {
          text: theadData[i],
          styles: (props.styles.thead && props.styles.thead.th ? props.styles.thead.th : {})
        }));
      }
    }

    if(tbodyData && tbodyData.length > 0){
      tbody.appendChild(tr);
      for(i=0, j = tbodyData.length; i<j; i++){
        tbody.appendChild(this.create("td", {
          text: tbodyData[i],
          styles: (props.styles.tbody && props.styles.tbody.td ? props.styles.tbody.td : {})
        }));
      }
    }

    if(tfootData && tfootData.length > 0){
      tfoot.appendChild(tr);
      for(i=0, j=tfootData.length; i<j; i++){
        tfoot.appendChild(this.create("td", {
          text: tfootData[i]
        }));
      }
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    table.appendChild(tfoot);

    table.populate = function(data){
      console.log(data);
      var tr;
      for(var i=0, j=data.length; i<j; i++){
        tr = self.create("tr");
        for(var k=0, l=data[i].length; k<l; k++){
          tr.appendChild(self.create("td", {
            text: data[i][k],
            styles: (props.styles.tbody && props.styles.tbody.td ? props.styles.tbody.td : {})
          }));
        }
      }
      var tbody = this.getElementsByTagName("tbody")[0];
      tbody.appendChild(tr);

    };

    return table;
  };
}