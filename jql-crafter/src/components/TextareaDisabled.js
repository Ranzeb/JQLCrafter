export default function TextareaDisabled({ text }) {

    return (
        <div className='w-full'>
            <form className="relative py-20 px-20">

                <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                    <label htmlFor="description" className="sr-only">
                        Description
                    </label>

                    <textarea
                        rows={2}
                        name="description"
                        id="description"
                        className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Write a description..."
                        value={text}
                        disabled
                    />

                    {/* Spacer element to match the height of the toolbar */}
                    <div aria-hidden="true">
                        <div className="py-2">
                            <div className="h-9" />
                        </div>
                        <div className="h-px" />
                        <div className="py-2">
                            <div className="py-px">
                                <div className="h-9" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}