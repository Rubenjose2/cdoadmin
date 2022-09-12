import { ElementRef, Injectable } from '@angular/core';
import { read, utils, writeFile, writeFileXLSX } from 'xlsx';
import { saveAs } from 'file-saver';


const EXCEL_EXTENSION = 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {


  constructor() { }

    /**
   * Creates excel from the table element reference.
   *
   * @param element DOM table element reference.
   * @param fileName filename to save as.
   */
     public exportTableElmToExcel(element: any, fileName: string): void {
      
      // const worksheet = XLSX.utils.json_to_sheet(element);
      // // generate workbook and add the worksheet
      // const workbook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      // XLSX.utils.sheet_to_csv(worksheet);
      // XLSX.write(workbook,{bookType:EXCEL_EXTENSION,type:'base64'});    
      // XLSX.writeFile(workbook, `${fileName}.${EXCEL_EXTENSION}`);

      const ws = utils.json_to_sheet(element);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Data");
      writeFile(wb, `${fileName}.${EXCEL_EXTENSION}`);

      //console.log(workbook);
     }

}
