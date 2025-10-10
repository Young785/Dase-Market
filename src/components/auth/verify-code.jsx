"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./style.css"
import toast, { Toaster } from "react-hot-toast"
import axiosInstance from "../../axiosInstance.js"

import OtpInput from "react-otp-input"

export default function VerifyCode() {
  const [OTPcode, setOTPCode] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const navigate = useNavigate()

  const notifySuccess = (text) =>
    toast.success(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const notifyError = (text) =>
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  useEffect(() => {
    let isSubscribed = true

    const checkAuth = async () => {
      const getAuth = JSON.parse(localStorage.getItem("signup_record"))
      if (!getAuth) {
        notifyError("Kindly proceed to login!")
        setTimeout(() => {
          navigate("/")
        }, 1500)
        return
      }

      // Check if OTP has already been sent from registration page
      const otpAlreadySent = localStorage.getItem("otp_sent")

      // Display the OTP message if it exists
      const otpMessage = localStorage.getItem("otp_message")
      if (otpMessage) {
        notifySuccess(otpMessage)
        localStorage.removeItem("otp_message") // Clear the message after showing it
      }

      // Only send OTP if it hasn't been sent already
      if (!otpAlreadySent) {
        handleConfirmAcct()
      }
    }

    checkAuth()

    return () => {
      isSubscribed = false
    }
  }, [navigate])

  const handleConfirmAcct = async () => {
    const getrecord = JSON.parse(localStorage.getItem("signup_record"))

    if (getrecord) {
      const obj = {
        phone_code: getrecord.business_phone_code,
        phone_number: getrecord.business_phone,
        business_email: getrecord.business_email,
      }

      setIsUploading(true)

      try {
        const response = await axiosInstance.post("/dase/confirm-account", obj)
        if (response.data.status) {
          localStorage.setItem("otp_sent", "true")
          notifySuccess(response.data.message)
        } else {
          notifyError(response.data.message)
        }
      } catch (error) {
        notifyError("Failed to send verification code.", error)
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleSendOTP = async (e) => {
    e.preventDefault()

    if (!OTPcode || OTPcode.length !== 6) {
      notifyError("Please enter a valid 6-digit verification code")
      return
    }

    const getrecord = JSON.parse(localStorage.getItem("signup_record"))

    if (getrecord) {
      const obj = {
        code: OTPcode,
        account_id: getrecord.account_id,
      }

      setIsUploading(true)

      try {
        const response = await axiosInstance.post("/dase/verify-code", obj)
        if (response.data.status) {
          notifySuccess(response.data.message)

          // Clear signup record and OTP flag
          localStorage.removeItem("signup_record")
          localStorage.removeItem("otp_sent")

          // Delay navigation to ensure toast messages are visible
          setTimeout(() => {
            navigate("/dase/login") // Redirect to login after verification
          }, 3500)
        } else {
          notifyError(response.data.message)
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Verification failed."
        notifyError(errorMessage)
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <div>
      <div className="auth-page-wrapper pt-5">
        <Toaster />
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>
          <div className="shape"></div>
        </div>
        <div className="auth-page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <a href="index.html" className="d-inline-block auth-logo">
                      <span className="dase-logo" height="20">
                        DASE
                      </span>
                    </a>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-9 col-lg-7 col-xl-6">
                <div className="card mt-4">
                  <div className="card-body p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Verify Your Code</h5>
                      <p className="text-muted">Get your free dase account now</p>
                    </div>
                    <div className="p-2 mt-4">
                      <form className="needs-validation" noValidate onSubmit={handleSendOTP}>
                        <div className="mb-3">
                          <label htmlFor="code" className="form-label">
                            Code <span className="text-danger">*</span>
                          </label>
                          <OtpInput
                            value={OTPcode}
                            onChange={setOTPCode}
                            numInputs={6}
                            renderSeparator={<span style={{ width: "10px" }}></span>}
                            renderInput={(props) => (
                              <input
                                {...props}
                                className="form-control"
                                style={{ width: "50px", height: "50px", fontSize: "20px", textAlign: "center" }}
                              />
                            )}
                            containerStyle={{ display: "flex", justifyContent: "space-between" }}
                          />
                          <div className="invalid-feedback">Please enter verification code</div>
                        </div>
                        <div className="mt-4">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isUploading || OTPcode.length !== 6}
                          >
                            {isUploading ? "Verifying..." : "Verify"}
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <p className="mb-2">Verify to continue </p>
                          <span
                            onClick={handleConfirmAcct}
                            style={{ cursor: isUploading ? "not-allowed" : "pointer" }}
                            className={`fw-semibold text-primary ${isUploading ? "opacity-50" : ""}`}
                          >
                            {isUploading ? "Sending..." : "Resend OTP"}
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Already have an account?{" "}
                    <Link to="/" className="fw-semibold text-primary text-decoration-underline">
                      {" "}
                      Signin{" "}
                    </Link>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
