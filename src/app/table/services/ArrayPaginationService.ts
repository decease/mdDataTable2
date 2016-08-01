import {IPaginationService} from "../interfaces/IPaginationService";
import {IColumn} from "../interfaces/IColumn";
import {IRow} from "../interfaces/IRow";
import * as _ from "lodash";
import {Injectable} from "@angular/core";

@Injectable()
export class ArrayPaginationService implements IPaginationService{
    itemsPerPage: number;
    page: number;
    sortColumn: IColumn; //todo move it to sortservice
    totalRowsCount: number;

    constructor(){
        this.page = this.page || 1;
    }

    transformRows(rows: Array<IRow>):Array<IRow> {
        if(this.isActive() == false){
            return rows;
        }

        this.totalRowsCount = rows.length; // question if this is the right approach

        return _.slice(rows, this.getStartIndex(), this.getStartIndex() + this.itemsPerPage);
    }

    isActive(){
        return this.itemsPerPage > 0;
    }

    setItemsPerPage(pageSize: number){
        this.itemsPerPage = pageSize;
        this.page = 1;
    }

    getStartIndex(): number{
        return (this.page-1) * this.itemsPerPage;
    }

    nextPage(): void{
        if(this.hasNextPage()){
            this.page++;
        }
    }

    previousPage(): void{
        if(this.hasPreviousPage()){
            this.page --;
        }
    }

    hasPreviousPage(): boolean {
        return this.page > 1;
    }

    hasNextPage(): boolean {
        var totalPages = Math.ceil(this.totalRowsCount / this.itemsPerPage);

        return this.page < totalPages;
    }
/*
this should be in sortservice
    transformRows(rows: Array<IRow>):Array<IRow> {
        if(this.sortColumn === undefined){
            return rows;
        }

        var that = this;
        let res =  _.sortBy(rows, function(aRow:IRow){
            let index = _.findIndex(aRow.value, (cell:ICell) => {
                return cell.dataKey == that.sortColumn.dataKey;
            });

            return aRow.value[index].value;
        });

        return res;
    }
*/
}