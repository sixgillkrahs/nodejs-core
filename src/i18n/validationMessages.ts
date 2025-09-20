export const validationMessages = {
    vi: {
        required: (field: string) => `${field} là bắt buộc`,
        email: "Email không hợp lệ",
        emailMax: "Email không được dài quá 99 ký tự",
        firstnameMax: "Họ không được dài quá 16 ký tự",
        lastnameMax: "Tên không được dài quá 16 ký tự",
        phoneLength: "Số điện thoại phải có đúng 10 ký tự",
        phoneInvalid: "Số điện thoại chỉ được chứa số",
    },
    en: {
        required: (field: string) => `${field} is required`,
        email: "Invalid email address",
        emailMax: "Email must be less than 99 characters",
        firstnameMax: "Firstname must be less than 16 characters",
        lastnameMax: "Lastname must be less than 16 characters",
        phoneLength: "Phone number must have exactly 10 digits",
        phoneInvalid: "Phone number must contain only digits",
    },
} as const;
