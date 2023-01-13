import { MatPaginatorIntl } from "@angular/material/paginator";

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  let lang = localStorage.getItem("lang");
  if (length == 0 || pageSize == 0) {
    if (lang === "en") {
      return `0 of ${length}`;
    }
    if (lang === "hy") {
      return `0 -ից ${length}`;
    }
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;
  if (lang === "en") {
    return `${startIndex + 1}-${endIndex} of ${length}`;
  }
  if (lang === "hy") {
    return `${startIndex + 1}-${endIndex} ${length}-ից`;
  }
};

export function getDutchPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  let lang = localStorage.getItem("lang");
  if (lang === "en") {
    paginatorIntl.itemsPerPageLabel = "Items per page:";
    paginatorIntl.nextPageLabel = "Next page";
    paginatorIntl.previousPageLabel = "Previous page";
    paginatorIntl.lastPageLabel = "Last page";
    paginatorIntl.firstPageLabel = "First page";
  }
  if (lang === "hy") {
    paginatorIntl.itemsPerPageLabel = "Էջում առկա տվյալների քանակ";
    paginatorIntl.nextPageLabel = "Հաջորդ էջ";
    paginatorIntl.previousPageLabel = "Նախորդ էջ";
    paginatorIntl.lastPageLabel = "Վերջին էջ";
    paginatorIntl.firstPageLabel = "Առաջին էջ";
  }

  paginatorIntl.getRangeLabel = dutchRangeLabel;

  return paginatorIntl;
}
