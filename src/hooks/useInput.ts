import React, { ChangeEvent, useState } from 'react'

function useInput(initial: string | number) {
    const [value, setValue] = useState<string | number>(initial)
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue);
    }
    return {
        value, onChange
    }
}

export default useInput
