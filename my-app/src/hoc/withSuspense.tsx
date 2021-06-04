import React from "react";
import Preloader from "../components/common/Preloader/Preloader";

export function withSuspense<T>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {
        return <React.Suspense fallback={<Preloader/>}>
            <WrappedComponent {...props}/>
        </React.Suspense>
    }
}
