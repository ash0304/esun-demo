export function getDate(arg = 0) {
  let tempDate = new Date();
  tempDate.setDate(tempDate.getDate() - arg);
  let yyyy = tempDate.getFullYear();
  let mm = tempDate.getMonth() + 1;
  let dd = tempDate.getDate();
  if (mm < 10) {
    mm = `0${mm}`;
  }
  if (dd < 10) {
    dd = `0${dd}`;
  }
  return `${yyyy}-${mm}-${dd}`;
}

export function generatorCSVname(name) {
  let tempDate = new Date();
  let yyyy = tempDate.getFullYear();
  let MM = tempDate.getMonth() + 1;
  let dd = tempDate.getDate();
  let hh = tempDate.getHours();
  let mm = tempDate.getMinutes();
  let ss = tempDate.getSeconds();
  if (MM < 10) {
    MM = `0${MM}`;
  }
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (hh < 10) {
    hh = `0${hh}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  if (ss < 10) {
    ss = `0${ss}`;
  }
  return `${name}_${yyyy}${MM}${dd}_${hh}${mm}${ss}`;
}
