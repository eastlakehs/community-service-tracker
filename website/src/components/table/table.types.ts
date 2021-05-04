export interface tableDataType {
  header: ["Name", "Description", "Hour", "Date"];
  data: {
    Name: string;
    Description: string;
    Hours: number;
    Date: string;
  }[];
}
