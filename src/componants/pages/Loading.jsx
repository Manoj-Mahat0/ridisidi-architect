const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="border-8 border-white border-opacity-30 border-l-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            <p className="mt-4 text-white">Loading...</p>
        </div>
    );
};

export default Loading;
