import React from "react";

const CSTable: React.FunctionComponent<{ header: any, body: any, className: string }> = ({ header, body, className }) => {
    const generateHeader = () => {
        let res = [];
        for (var i = 0; i < header.length; i++) {
            res.push(<th key={header[i]}>{header[i]}</th>)
        }
        return res;
    }
    const generateTableData = () => {
        let res = [];
        for (var i = 0; i < body.length; i++) {
            res.push(
                <tr >
                    <td className="border px-4 py-2" key={body[i].Name}>{body[i].Name}</td>
                    <td className="border px-4 py-2" key={body[i].Description}>{body[i].Description}</td>
                    <td className="border px-4 py-2" key={body[i].Hours}>{body[i].Hours}</td>
                    <td className="border px-4 py-2" key={body[i].Date}>{body[i].Date}</td>
                </tr>
            )
        }
        return res;
    }
    return (
        <div>
            <table className={className}>
                <thead className="px-4 py-2">
                    <tr>
                        {generateHeader()}
                    </tr>
                </thead>
                <tbody>
                    {generateTableData()}
                </tbody>
            </table>
        </div>
    )

}

export default CSTable;