import React from "react";

const CSTable: React.FunctionComponent<{ header: any, body: any, className: string }> = ({ header, body, className }) => {
    const generateHeader = () => {
        return header.map((row: any) => {
            return (<th key={row}>{row}</th>)
        })

    }
    const generateTableData = () => {
        return body.map((row: any) => {
            return (<tr >
                <td className="border px-4 py-2" key={row.Name}>{row.Name}</td>
                <td className="border px-4 py-2" key={row.Description}>{row.Description}</td>
                <td className="border px-4 py-2" key={row.Hours}>{row.Hours}</td>
                <td className="border px-4 py-2" key={row.Date}>{row.Date}</td>
            </tr>)
        })
    }
    return (
        <div>
            <table className={className}>
                <thead className="px-4 py-2">
                    <tr>
                        <>{generateHeader()}</>
                    </tr>
                </thead>
                <tbody>
                    <>{generateTableData()}</>
                </tbody>
            </table>
        </div>
    )

}

export default CSTable;