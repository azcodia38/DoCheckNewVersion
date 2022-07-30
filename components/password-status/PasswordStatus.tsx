/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useEffect, useState } from 'react'

// @utils
import { theme } from 'src/utils/const'
import {
    Circle,
    CircleText,
    CircleTextGroup,
    PasswordStatusContainer,
} from 'components/password-status/styled'

// @components
import { TickSquareIcon } from 'components/icons/Icons'
import Tipografi from 'src/components/atoms/tipografi'

interface PasswordStatusProps {
    password: string
    onValidationChange(ok: boolean): void
}

export default function PasswordStatus(props: PasswordStatusProps) {
    // const [huruf_besar_ok, setHurufBesarOK] = useState<boolean>(false);
    // const [huruf_kecil_ok, setHurufKecilOK] = useState<boolean>(false);
    // const [simbol_ok, setSimbolOK] = useState<boolean>(false);

    const [huruf_ok, setHurufOK] = useState<boolean>(false)
    const [angka_ok, setAngkaOK] = useState<boolean>(false)
    const [limit_ok, setLimitOK] = useState<boolean>(false)

    useEffect(() => {
        setHurufOK(/[A-Za-z]/.test(props.password))
        setAngkaOK(/[0-9]/.test(props.password))
        setLimitOK(props.password.length >= 5)

        // setHurufBesarOK(/[A-Z]/.test(props.password));
        // setHurufKecilOK(/[a-z]/.test(props.password));
        // setSimbolOK(/[\!\@\#\$]/.test(props.password));
    }, [props.password])

    // useEffect(() => {
    //   props.onValidationChange(huruf_besar_ok && huruf_kecil_ok && angka_ok && simbol_ok && limit_ok);
    // }, [huruf_besar_ok, huruf_kecil_ok, angka_ok, simbol_ok, limit_ok]);

    useEffect(() => {
        props.onValidationChange(huruf_ok && angka_ok && limit_ok)
    }, [huruf_ok, angka_ok, limit_ok])

    return (
        <PasswordStatusContainer>
            <CircleTextGroup>
                <CircleText>
                    <Circle
                        style={{
                            backgroundColor: huruf_ok
                                ? theme.main_color
                                : '#818487',
                        }}
                    >
                        <TickSquareIcon />
                    </Circle>
                    <Tipografi
                        type={'smaller'}
                        style={{
                            color: huruf_ok ? theme.main_color : '#818487',
                        }}
                    >
                        Huruf
                    </Tipografi>
                </CircleText>
            </CircleTextGroup>
            {/* <CircleTextGroup>
        <CircleText>
          <Circle style={{ backgroundColor: angka_ok ? theme.main_color : '#818487' }} />
          <Tipografi type={'smaller'} style={{ color: angka_ok ? theme.main_color : '#818487' }}>
            Angka
          </Tipografi>
        </CircleText>
        <CircleText>
          <Circle style={{ backgroundColor: simbol_ok ? theme.main_color : '#818487' }} />
          <Tipografi type={'smaller'} style={{ color: simbol_ok ? theme.main_color : '#818487' }}>
            Simbol (!@#$)
          </Tipografi>
        </CircleText>
      </CircleTextGroup> */}
            <CircleTextGroup>
                <CircleText>
                    <Circle
                        style={{
                            backgroundColor: angka_ok
                                ? theme.main_color
                                : '#818487',
                        }}
                    >
                        <TickSquareIcon />
                    </Circle>
                    <Tipografi
                        type={'smaller'}
                        style={{
                            color: angka_ok ? theme.main_color : '#818487',
                        }}
                    >
                        Angka
                    </Tipografi>
                </CircleText>
            </CircleTextGroup>
            <CircleTextGroup>
                <CircleText>
                    <Circle
                        style={{
                            backgroundColor: limit_ok
                                ? theme.main_color
                                : '#818487',
                        }}
                    >
                        <TickSquareIcon />
                    </Circle>
                    <Tipografi
                        type={'smaller'}
                        style={{
                            color: limit_ok ? theme.main_color : '#818487',
                        }}
                    >
                        Minimal 5 karakter
                    </Tipografi>
                </CircleText>
            </CircleTextGroup>
        </PasswordStatusContainer>
    )
}
