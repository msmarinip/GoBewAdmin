import React from 'react'
import { useField } from 'formik'


export default function CheckBox({label, ...props}) {
    const [field] = useField(props);
    
    return (
        <>
            <label htmlFor={ props.id || props.name }>{ label }</label>
            <input {...field}  {...props} value={true} />
        </>
    )
}
