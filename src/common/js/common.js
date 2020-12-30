import Time from "./time";

export const useStreamExportExcel = function(stream, title, nick) {
  const blob = new Blob([stream], { type: "application/xlsx" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  if (nick) {
    link.download = `${nick}_${title}_${Time.getDateTime()}.xlsx`;
  } else {
    link.download = `${title}_${Time.getDateTime()}.xlsx`;
  }
  link.click();
  setTimeout(() => {
    URL.revokeObjectURL(blob);
  }, 0);
};

export const downloadFile = function(url) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "__target";
  link.click();
}
