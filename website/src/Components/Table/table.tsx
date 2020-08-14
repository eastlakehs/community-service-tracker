import React from "react";

import Filter from "./filter"
import Page from "./page";

const CSTable: React.FunctionComponent<{ header: any, body: any }> = ({ header, body }) => {
    const generateHeader = () => {
        return header.map((row: any) => {
            return (<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" key={row}>{row}</th>)
        })

    }
    const generateTableData = () => {
        return body.map((row: any) => {
            return (<tr >
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" key={row.Name}>
                    <p className="text-gray-900 whitespace-no-wrap">{row.Name}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" key={row.Description}>
                    <p className="text-gray-900 whitespace-no-wrap">{row.Description}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" key={row.Hour}>
                    <p className="text-gray-900 whitespace-no-wrap">{row.Hour}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" key={row.Date}>
                    <p className="text-gray-900 whitespace-no-wrap">{row.Date}</p>
                </td>
            </tr>)
        })
    }
    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <Filter />
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className={"min-w-full leading-normal"}>
                            <thead>
                                <tr>
                                    <>{generateHeader()}</>
                                </tr>
                            </thead>
                            <tbody>
                                <>{generateTableData()}</>
                            </tbody>
                        </table>
                        <Page />
                    </div>
                </div >
            </div>
        </div>
    )

}

export default CSTable;
