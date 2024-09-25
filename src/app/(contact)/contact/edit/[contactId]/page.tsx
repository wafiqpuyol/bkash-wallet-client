'use client';

import { PageLoader } from '@/components/PageLoader';
import { useContactGroupEdit } from '@/hooks/contact/useContactGroup';
import { ContactForm } from '@/components/contact/ContactForm';

interface EditContactGroupProps {
    params: {
        contactId: string;
    }
}

const EditContactGroup: React.FC<EditContactGroupProps> = ({ params }) => {
    const {
        isPending,
        notificationGroup,
        emails,
        itemInput,
        setNotificationGroup,
        setEmails,
        setItemInput,
        onHandleSubmit
    } = useContactGroupEdit(params.contactId);

    return (
        <>
            {isPending ? (
                <PageLoader />
            ) : (
                <ContactForm
                    label="Update Group"
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

export default EditContactGroup;