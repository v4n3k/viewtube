'use client';

import { TextField } from '@/shared/ui';
import clsx from 'clsx';
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';
import { ZodType } from 'zod';
import styles from './FormContainer.module.css';

export interface FormFieldConfig<T> {
	key: keyof T;
	placeholder?: string;
	type?: string;
	label?: string;
}

type FieldErrors<T> = Partial<Record<keyof T, string | undefined>>;

interface FormContainerProps<T> {
	className?: string;
	title: string;
	initialFormState: T;
	fields: FormFieldConfig<T>[];
	onSubmit: (form: T) => void;
	actions: ReactNode;
	schema: ZodType<T>;
}

export const FormContainer = <T extends Record<string, any>>({
	title,
	initialFormState,
	schema,
	fields,
	onSubmit,
	actions,
	className,
}: FormContainerProps<T>) => {
	const [userForm, setUserForm] = useState<Partial<T>>({});
	const [fieldErrors, setFieldErrors] = useState<FieldErrors<T>>({});
	const [generalError, setGeneralError] = useState<string | null>(null);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const form: T = {
		...initialFormState,
		...userForm,
	};

	const validateForm = (data: T): boolean => {
		const result = schema.safeParse(data);

		if (!result.success) {
			const newFieldErrors: FieldErrors<T> = {};
			let newGeneralError: string | null = null;

			result.error.issues.forEach(issue => {
				if (issue.path.length > 0) {
					newFieldErrors[issue.path[0] as keyof T] = issue.message;
				} else {
					if (!newGeneralError) {
						newGeneralError = issue.message;
					}
				}
			});
			setFieldErrors(newFieldErrors);
			setGeneralError(newGeneralError);
			return false;
		} else {
			setFieldErrors({});
			setGeneralError(null);
			return true;
		}
	};

	const handleFormChange = (key: keyof T, e: ChangeEvent<HTMLInputElement>) => {
		setUserForm(prev => ({ ...prev, [key]: e.target.value }));

		if (isFormSubmitted) {
			setFieldErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[key];
				return newErrors;
			});
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsFormSubmitted(true);

		const isValid = validateForm(form);

		if (!isValid) return;

		onSubmit(form);
	};

	return (
		<section className={clsx(styles.formContainer, className)}>
			<h2 className={styles.title}>{title}</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				{fields.map(field => (
					<TextField
						key={String(field.key)}
						label={field.label}
						value={form[field.key] || ''}
						onChange={e => handleFormChange(field.key, e)}
						placeholder={field.placeholder}
						type={field.type}
						errorMessage={isFormSubmitted ? fieldErrors[field.key] : undefined}
					/>
				))}

				{isFormSubmitted && generalError && (
					<p className={styles.generalErrorMessage}>{generalError}</p>
				)}

				<div className={styles.actionsContainer}>{actions}</div>
			</form>
		</section>
	);
};
