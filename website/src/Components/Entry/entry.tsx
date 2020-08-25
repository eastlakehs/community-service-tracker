import React from "react"

const Entry: React.FunctionComponent<{}> = () => {
    return (
        <StringField name="Activity Name" placeholder="Enter Activity Name"/>
    )
}

const StringField: React.FunctionComponent<{ name: string, placeholder: string}> = ({name, placeholder}) => {
    return (
        <form className="w-full max-w-lg container mx-auto px-4 sm:px-8">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                        {name}
                        </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder={placeholder} />
                </div>
            </div>
        </form>
    )
}

export default Entry;
export { };