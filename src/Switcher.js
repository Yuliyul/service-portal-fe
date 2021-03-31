import * as React from 'react';
import { Component } from 'react';
import Button from '@material-ui/core/Button';
import { useLocale, useSetLocale } from 'react-admin';

const LocaleSwitcher = () => {
    const locale = useLocale();
    const setLocale = useSetLocale();
    return (
        <div>
            <div>Language</div>
            <Button disabled={locale === 'de'} onClick={() => setLocale('de')}>
                English
            </Button>
            <Button disabled={locale === 'en'} onClick={() => setLocale('en')}>
                German
            </Button>
        </div>
    );
};

export default LocaleSwitcher;
