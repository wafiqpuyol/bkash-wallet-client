import { IUserAuth } from "@/interfaces/user";
import { Dispatch, useContext, useState } from "react";
import { LoginType, registerSchema, RegisterType } from "@/validation/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FetchResult, MutationFunctionOptions, useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/queries/auth";
import { useRouter } from "next/navigation";
import { showErrorToast } from "@/utils/toast";
import { DispatchProps, MonitorContext } from "@/context/MonitorContext";


export const useRegister = (): IUserAuth => {
    const { dispatch } = useContext(MonitorContext);
    const [validationErrors, setValidationErrors] = useState<RegisterType | LoginType>({
        username: '',
        password: '',
        email: ''
    });
    const router = useRouter();
    const [registerUser, { loading }] = useMutation(REGISTER_USER);

    const onRegisterSubmit = async (formData: FormData): Promise<void> => {
        const resultSchema = registerSchema.safeParse(Object.fromEntries(formData));
        if (!resultSchema.success) {
            setValidationErrors({
                username: resultSchema.error.format().username?._errors[0]!,
                email: resultSchema.error.format().email?._errors[0]!,
                password: resultSchema.error.format().password?._errors[0]!
            });
        } else {
            submitUserData(resultSchema.data, registerUser, dispatch, router);
        }
    }

    return {
        loading,
        validationErrors,
        setValidationErrors,
        onRegisterSubmit
    }
}


async function submitUserData(
    data: RegisterType,
    registerUserMethod: (options?: MutationFunctionOptions | undefined) => Promise<FetchResult>,
    dispatch: Dispatch<DispatchProps>,
    router: AppRouterInstance
) {
    try {
        const result: FetchResult = await registerUserMethod({ variables: { user: data } });
        if (result && result.data) {
            const { registerUser, authSocialUser } = result.data;
            dispatch({
                type: 'dataUpdate',
                payload: {
                    user: registerUser ? registerUser.user : authSocialUser.user,
                    notifications: registerUser ? registerUser.notifications : authSocialUser.notifications
                }
            });
            router.push('/login');
        }
    } catch (error: unknown) {
        console.log("submitUserData ---->", error);

        showErrorToast(error.message || "Invalid credentials");
    }
}
