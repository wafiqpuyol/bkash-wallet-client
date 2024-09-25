'use client';

import { useContactGroupCreate } from '@/hooks/contact/useContactGroup';
import { PageLoader } from '@/components/PageLoader';
import { ContactForm } from '@/components/contact/ContactForm';

const CreateContact: React.FC = () => {
    const {
        isPending,
        notificationGroup,
        emails,
        itemInput,
        setNotificationGroup,
        setEmails,
        setItemInput,
        onHandleSubmit
    } = useContactGroupCreate();

    return (
        <>
            {isPending ? (
                <PageLoader />
            ) : (
                <ContactForm
                    label="Create Group"
                    notificationGroup={notificationGroup}
                    emails={emails}
                    itemInput={itemInput}
                    setNotificationGroup={setNotificationGroup}
                    setEmails={setEmails}
                    setItemInput={setItemInput}
                    onFormHandler={onHandleSubmit}
                />
            )}
        </>
    )
}

export default CreateContact;