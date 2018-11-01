import React from "react";
import { string, func, element, oneOfType } from "prop-types";
import { parse } from "papaparse";

const CSVReader = ({
  cssClass = "csv-reader-input",
  label,
  onFileLoaded,
  onError,
  inputId = null
}) => {
  let handleChangeFile = handleChangeMaker(onError, onFileLoaded);
  return (
    <div className={cssClass}>
      {label && <label>{label}</label>}
      <input
        className="csv-input"
        type="file"
        id={inputId}
        accept="text/csv"
        onChange={e => handleChangeFile(e)}
      />
    </div>
  );
};
CSVReader.propTypes = {
  cssClass: string,
  label: oneOfType([string, element]),
  onFileLoaded: func,
  onError: func,
  inputId: string
};

export default CSVReader;

function handleChangeMaker(onError, onFileLoaded) {
  return function handleChangeFile(e) {
    let reader = new FileReader();
    const filename = e.target.files[0].name;
    reader.onload = event => {
      const csvData = parse(event.target.result, {
        error: onError
      });
      onFileLoaded(csvData.data, filename);
    };
    reader.readAsText(e.target.files[0]);
  };
}
