"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import axiosInstance from "../../../axiosInstance";
import config from "@/config";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import LoadingIcons from "react-loading-icons";
import PostComments from "./PostComments";
import bus from "@/app/bus";
import styles from "./VotingModule.module.css"; // Import CSS module for scoped styles
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [PostDetailsData, setPostDetailsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paramId, setParamId] = useState(null);
  const [IsLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [IsDisLiked, setIsDisLiked] = useState(false);
  const [isDisLiking, setIsDisLiking] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [IsSharePostDialogOpen, setIsSharePostDialogOpen] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const handleToggleDetailsDialog = (event) => {
    setIsSharePostDialogOpen(!IsSharePostDialogOpen);
  };

  // Handle the click event to toggle classes
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const fetchPostDetails = async (id) => {
    // console.log("paramId: ", paramId);
    if (!id) {
      console.error("No Post ID found in the URL.");
      setLoading(false);
      return;
    }

    // console.log(`Post ID from URL: ${id}`); // Log the ID

    try {
      const response = await axiosInstance.get(
        `${config.BASE_URL}/accounts/channels/posts/single/${id}`
      );

      if (response.status < 300 || response.data.success) {
        // console.log("response ", response.data.data);
        const singleAudioPost = {
          id: response.data.data.post.id,
          title: response.data.data.post.title,
          tags: [response.data.data.post.slug],
          image: `${config.SERVER_URL}/${response.data.data.post.image}`,
          url: `${config.SERVER_URL}/${response.data.data.post.audio}`,
          channel_id: response.data.data.post.channel.channel_id,
          channel_name: response.data.data.post.channel.name,
          channel_tag: `${response.data.data.post.channel.tag}`,
          channel_image: `${config.SERVER_URL}/${response.data.data.post.channel.image}`,
        };

        if (singleAudioPost) {
          // console.log('singleAudioPost', singleAudioPost);
          bus.emit('emitted_single_audio_array', singleAudioPost);
        }


        setPostDetailsData(response.data.data);
        if (response.data.data.post.is_liked === "YES") {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
        // console.log('PostDetailsData:', PostDetailsData);

      } else {
        console.error(
          "Failed to fetch post details:",
          response.data.message
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error fetching post details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setParamId(params.id);
    // Wait for the router to be ready

    if (paramId) {
      // console.log("New extracted paramId:", paramId);
      // console.log("count and others:", router, params, pathname);
      fetchPostDetails(paramId);
    }

    bus.on("refreshPostData", (val) => {
      if (val) {
        fetchPostDetails(paramId);
      }

      return () => {
        bus.off("refreshPostData", fetchPostDetails(paramId));
      };
    });
  }, [paramId]);

  // Function to convert seconds to "HH:MM:SS" format
  const formatAudioLength = (lengthInSeconds) => {
    const hours = Math.floor(lengthInSeconds / 3600);
    const minutes = Math.floor((lengthInSeconds % 3600) / 60);
    const seconds = Math.floor(lengthInSeconds % 60);

    // Pad each value with leading zeros if necessary
    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = seconds.toString().padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };

  const handleLike = async () => {
    if (!params.id) {
      console.error("No post ID found in the URL.");
      setIsLiking(false);
      return;
    }
    setIsLiking(false);
    try {
      const response = await axiosInstance.post(
        `${config.BASE_URL}/accounts/channels/posts/like`,
        {
          post_id: params.id,
        }
      );

      if (response.status < 300 || response.data.success) {
        fetchPostDetails(params.id);
        if (response.data.message === "Post liked successfully") {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("An error occured: ", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDisLike = async () => {
    if (!params.id) {
      console.error("No post ID found in the URL.");
      setIsDisLiking(false);
      return;
    }
    setIsDisLiking(true);

    try {
      const response = await axiosInstance.post(
        `${config.BASE_URL}/accounts/channels/posts/dislike`,
        {
          post_id: params.id,
        }
      );

      if (response.status < 300 || response.data.success) {
        fetchPostDetails(params.id);
        if (response.data.message === "Post disliked successfully") {
          setIsDisLiked(true);
        } else {
          setIsDisLiked(false);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("An error occured: ", error);
    } finally {
      setIsDisLiking(false);
    }
  };

  const postLink = `localhost:3000/streamers/posts/single/${params.id}`;
  const iframeSrc = `
    <iframe width="560" height="315" src="${postLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(iframeSrc).then(() => {
      toast.success('Embed code copied!');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  const handleShareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${postLink}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${postLink}`;
    window.open(facebookUrl, '_blank');
  };

  const handleShareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${postLink}`;
    window.open(twitterUrl, '_blank');
  };

  const handleShareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${postLink}`;
    window.open(linkedInUrl, '_blank');
  };

  const handleShareToMail = () => {
    const mailUrl = `mailto:?subject=Check out this post on LiveStreaming App&body=${postLink}`;
    window.open(mailUrl);
  };


  return (
    <>
      <main className="main">
        <div className="container-fluid">
          {loading ? (
            <div className="spinner-wrapper">
              <div className="spinner">
                <div className="dot1"></div>
                <div className="dot2"></div>
              </div>
            </div>
          ) : (
            <div className="row row--grid">
              {/* <!-- breadcrumb --> */}
              <div className="col-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb__item">
                    <Link href="/streamers/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb__item">
                    <Link href="/streamers/posts">Posts</Link>
                  </li>
                  <li className="breadcrumb__item breadcrumb__item--active">
                    Single
                  </li>
                </ul>
              </div>
              {/* <!-- end breadcrumb --> */}

              {/* <!-- title --> */}
              {/* <div className="col-12">
                <div className="main__title main__title--page">
                  <h1>{PostDetailsData?.post?.title}</h1>
                </div>
              </div> */}
              {/* <!-- end title --> */}

              <div className="col-12">
                <div className="release d-flex align-items-center">
                  <div className="release__content">
                    <div className="release__cover">
                      <img
                        src={`${PostDetailsData?.post?.image
                          ? config.SERVER_URL +
                          "/" +
                          PostDetailsData?.post?.image
                          : "/img/covers/cover3.jpg"
                          }`}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="ml-4">
                    <div className="main__title main__title--page mt-0">
                      <h2>{PostDetailsData?.post?.title}</h2>
                    </div>
                    <div className="release__stat">
                      {/* Audio Length:  */}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21.65,2.24a1,1,0,0,0-.8-.23l-13,2A1,1,0,0,0,7,5V15.35A3.45,3.45,0,0,0,5.5,15,3.5,3.5,0,1,0,9,18.5V10.86L20,9.17v4.18A3.45,3.45,0,0,0,18.5,13,3.5,3.5,0,1,0,22,16.5V3A1,1,0,0,0,21.65,2.24ZM5.5,20A1.5,1.5,0,1,1,7,18.5,1.5,1.5,0,0,1,5.5,20Zm13-2A1.5,1.5,0,1,1,20,16.5,1.5,1.5,0,0,1,18.5,18ZM20,7.14,9,8.83v-3L20,4.17Z" />
                        </svg>
                        {PostDetailsData?.post?.audio_length
                          ? formatAudioLength(
                            parseFloat(PostDetailsData.post.audio_length)
                          )
                          : "00:00:00"}
                      </span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20,13.18V11A8,8,0,0,0,4,11v2.18A3,3,0,0,0,2,16v2a3,3,0,0,0,3,3H8a1,1,0,0,0,1-1V14a1,1,0,0,0-1-1H6V11a6,6,0,0,1,12,0v2H16a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h3a3,3,0,0,0,3-3V16A3,3,0,0,0,20,13.18ZM7,15v4H5a1,1,0,0,1-1-1V16a1,1,0,0,1,1-1Zm13,3a1,1,0,0,1-1,1H17V15h2a1,1,0,0,1,1,1Z" />
                        </svg>
                        {PostDetailsData?.post?.views}
                      </span>
                      <span>
                        <i
                          className="bi bi-hand-thumbs-up fs-18 mr-2"
                          style={{ color: "#25a56a" }}
                        ></i>{" "}
                        {PostDetailsData?.post?.total_likes}
                      </span>
                      <span>
                        <i
                          className="bi bi-chat-quote fs-18 mr-2"
                          style={{ color: "#25a56a" }}
                        ></i>{" "}
                        {PostDetailsData?.post?.total_comments}
                      </span>
                    </div>
                    <div className="w-100 d-flex">
                      <a
                        onClick={handleLike}
                        className={`${isLiking ? "pl-3 pr-2" : "px-3"
                          } release__buy like_thumb fit-content cursor-pointer mr-3 `}
                      >
                        {isLiking ? (
                          <LoadingIcons.ThreeDots
                            max={15}
                            width={15}
                            height={20}
                          />
                        ) : (
                          <>
                            <span
                              className={`${styles.icon} ${styles.icon1} ${IsLiked ? styles.hiddenVote : ""
                                }`}
                            ></span>
                            <span
                              className={`${styles.icon} ${styles.icon2} ${!IsLiked ? styles.hiddenVote : ""
                                }`}
                            ></span>
                          </>
                        )}
                        {/* <i
                            className={`bi ${
                              IsLiked
                                ? "bi-hand-thumbs-up-fill"
                                : "bi-hand-thumbs-up"
                            } fs-20`}
                          ></i> */}
                      </a>

                      <Link
                        href={`#modal-info2`}
                        className="release__buy like_thumb fit-content cursor-pointer btn border d-inline fs-14 open-modal"
                        onClick={() => handleToggleDetailsDialog()}
                        style={{
                          borderRadius: "50px",
                          padding: "10px 16px",
                          background: "#222227",
                          color: "white",
                        }}
                      >
                        <i className={`bi bi-share fs-20`}></i>
                      </Link>

                      {/* <a onClick={handleDisLike} className="release__buy open-modal cursor-pointer">
                                            {
                                                    isDisLiking ?
                                                        <LoadingIcons.ThreeDots max={20} width={20} height={20} /> :

                                                        <i className={`bi ${IsDisLiked ? 'bi-hand-thumbs-down-fill' : 'bi-hand-thumbs-down'} fs-20`}></i>
                                                    }

                                            </a> */}
                      {/* <i className="bi bi-hand-thumbs-down fs-18 mr-2" style={{ color: `${isDisLiking ? '#fff' : '#25a56a'}` }}></i> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-9">
                <div className="article">
                  {/* <!-- article content --> */}
                  <div className="article__content">
                    <h4>Brief Description</h4>
                    <p>{PostDetailsData?.post?.description}</p>
                  </div>
                  {/* <!-- end article content --> */}

                  {/* <!-- share --> */}
                  <div className="share">
                    <a className="cursor-pointer share__link share__link--fb" onClick={handleShareToFacebook}>
                      <svg
                        width="9"
                        height="17"
                        viewBox="0 0 9 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5.56341 16.8197V8.65888H7.81615L8.11468 5.84663H5.56341L5.56724 4.43907C5.56724 3.70559 5.63693 3.31257 6.69042 3.31257H8.09873V0.5H5.84568C3.1394 0.5 2.18686 1.86425 2.18686 4.15848V5.84695H0.499939V8.6592H2.18686V16.8197H5.56341Z" />
                      </svg>{" "}
                      Share
                    </a>
                    <a className="cursor-pointer share__link share__link--tw" onClick={handleShareToTwitter}>
                      <svg
                        width="16"
                        height="12"
                        viewBox="0 0 16 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.55075 3.19219L7.58223 3.71122L7.05762 3.64767C5.14804 3.40404 3.47978 2.57782 2.06334 1.1902L1.37085 0.501686L1.19248 1.01013C0.814766 2.14353 1.05609 3.34048 1.843 4.14552C2.26269 4.5904 2.16826 4.65396 1.4443 4.38914C1.19248 4.3044 0.972149 4.24085 0.951164 4.27263C0.877719 4.34677 1.12953 5.31069 1.32888 5.69202C1.60168 6.22165 2.15777 6.74068 2.76631 7.04787L3.28043 7.2915L2.67188 7.30209C2.08432 7.30209 2.06334 7.31268 2.12629 7.53512C2.33613 8.22364 3.16502 8.95452 4.08833 9.2723L4.73884 9.49474L4.17227 9.8337C3.33289 10.321 2.34663 10.5964 1.36036 10.6175C0.888211 10.6281 0.5 10.6705 0.5 10.7023C0.5 10.8082 1.78005 11.4014 2.52499 11.6344C4.75983 12.3229 7.41435 12.0264 9.40787 10.8506C10.8243 10.0138 12.2408 8.35075 12.9018 6.74068C13.2585 5.88269 13.6152 4.315 13.6152 3.56293C13.6152 3.07567 13.6467 3.01212 14.2343 2.42953C14.5805 2.09056 14.9058 1.71983 14.9687 1.6139C15.0737 1.41264 15.0632 1.41264 14.5281 1.59272C13.6362 1.91049 13.5103 1.86812 13.951 1.39146C14.2762 1.0525 14.6645 0.438131 14.6645 0.258058C14.6645 0.22628 14.5071 0.279243 14.3287 0.374576C14.1398 0.480501 13.7202 0.639389 13.4054 0.734722L12.8388 0.914795L12.3247 0.565241C12.0414 0.374576 11.6427 0.162725 11.4329 0.0991699C10.8978 -0.0491255 10.0794 -0.0279404 9.59673 0.14154C8.2852 0.618204 7.45632 1.84694 7.55075 3.19219Z" />
                      </svg>{" "}
                      Tweet
                    </a>
                    <a className="cursor-pointer share__link share__link--vk" onClick={handleShareToLinkedIn}>
                      <i className="bi bi-linkedin mr-2"></i> {" "}
                      Share
                    </a>
                  </div>
                  {/* <!-- end share --> */}

                  {/* <!-- comments --> */}
                  {PostDetailsData &&
                  <PostComments PostDetailsData={PostDetailsData} />
                  }
                  {/* <!-- end comments --> */}
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      <div
        id="modal-info2"
        className={`${IsSharePostDialogOpen ? "" : ""} zoom-anim-dialog modal modal--info mfp-hide pb-5`}
        style={{
          minWidth: "600px",
        }}
      >
        {/* <span
          className="modal__icon"
          style={{
            bottom: "50px",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Zm0-8.5a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0v-3A1,1,0,0,0,12,11.5Zm0-4a1.25,1.25,0,1,0,1.25,1.25A1.25,1.25,0,0,0,12,7.5Z"></path>
          </svg>
        </span> */}

        <button
          className="modal__close"
          onClick={() => setIsSharePostDialogOpen(false)}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
          </svg>
        </button>

        <h4 className="sign__title fs-20 fw-500">Share Post</h4>

        {/* 

        {/* <!-- share --> */}

        <div className="share in_modal w-100 px-2 pt-3" style={{ overflowX: 'auto', }}>
          <div className="share_options_wrap cursor-pointer" onClick={handleCopyToClipboard}>
            <div className="share_options" style={{ background: 'whitesmoke', color: '#888' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" focusable="false" aria-hidden="true" style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}>
                <circle cx="18" cy="18" r="17.5" stroke="#E7E7E7" fill="#F4F4F4" stroke-width=".5"></circle>
                <path d="m21.41,23.29l-0.71,-0.71l4.59,-4.58l-4.59,-4.59l0.71,-0.71l5.3,5.3l-5.3,5.29zm-6.12,-0.7l-4.58,-4.59l4.59,-4.59l-0.71,-0.7l-5.3,5.29l5.29,5.29l0.71,-0.7z" fill="#606060"></path>
              </svg>
            </div>
            <p className="mb-0 mt-2 fs-13 text-center text-white">Embed</p>
          </div>

          <div className="share_options_wrap cursor-pointer" onClick={handleShareToWhatsApp}>
            <div className="share_options" style={{ background: '#25D366', color: '#fff' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" focusable="false" aria-hidden="true" style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}>
                <g fill="none" fill-rule="evenodd">
                  <circle cx="30" cy="30" r="30" fill="#25D366"></circle>
                  <path d="M39.7746 19.3513C37.0512 16.5467 33.42 15 29.5578 15C21.6022 15 15.1155 21.6629 15.1155 29.8725C15.1155 32.4901 15.7758 35.0567 17.0467 37.3003L15 45L22.6585 42.9263C24.7712 44.1161 27.148 44.728 29.5578 44.728C37.5134 44.728 44 38.0652 44 29.8555C44 25.8952 42.498 22.1558 39.7746 19.3513ZM29.5578 42.2295C27.3956 42.2295 25.2829 41.6346 23.4508 40.5127L23.0051 40.2408L18.4661 41.4646L19.671 36.9093L19.3904 36.4334C18.1855 34.4618 17.5583 32.1841 17.5583 29.8555C17.5583 23.0397 22.9556 17.4986 29.5743 17.4986C32.7763 17.4986 35.7968 18.7904 38.0581 21.119C40.3193 23.4476 41.5737 26.5581 41.5737 29.8555C41.5572 36.6884 36.1764 42.2295 29.5578 42.2295ZM36.1434 32.966C35.7803 32.779 34.0142 31.8782 33.6841 31.7592C33.354 31.6402 33.1064 31.5722 32.8754 31.9462C32.6278 32.3201 31.9511 33.153 31.7365 33.4079C31.5219 33.6629 31.3238 33.6799 30.9607 33.4929C30.5976 33.306 29.4422 32.915 28.0558 31.6572C26.9829 30.6714 26.2567 29.4476 26.0421 29.0907C25.8275 28.7167 26.0256 28.5127 26.2072 28.3258C26.3722 28.1558 26.5703 27.8839 26.7518 27.6799C26.9334 27.4589 26.9994 27.3059 27.115 27.068C27.2305 26.813 27.181 26.6091 27.082 26.4221C26.9994 26.2351 26.2732 24.3994 25.9761 23.6686C25.679 22.9377 25.3819 23.0397 25.1673 23.0227C24.9528 23.0057 24.7217 23.0057 24.4741 23.0057C24.2265 23.0057 23.8469 23.0907 23.5168 23.4646C23.1867 23.8385 22.2459 24.7394 22.2459 26.5581C22.2459 28.3938 23.5333 30.1445 23.7149 30.3994C23.8964 30.6544 26.2567 34.3938 29.8714 36.0085C30.7297 36.3994 31.4064 36.6204 31.9345 36.7904C32.7928 37.0793 33.5851 37.0283 34.2123 36.9433C34.9055 36.8414 36.3415 36.0425 36.6551 35.1756C36.9522 34.3088 36.9522 33.5609 36.8697 33.4079C36.7541 33.255 36.5065 33.153 36.1434 32.966Z" fill="white"></path>
                </g>
              </svg>
            </div>
            <p className="mb-0 mt-2 fs-13 text-center text-white">WhatsApp</p>
          </div>

          <div className="share_options_wrap cursor-pointer" onClick={handleShareToFacebook}>
            <div className="share_options" style={{ background: 'transparent', color: '#888' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" focusable="false" aria-hidden="true" style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}>
                <g fill="none" fill-rule="evenodd">
                  <path d="M28.4863253 59.9692983c-6.6364044-.569063-11.5630204-2.3269561-16.3219736-5.8239327C4.44376366 48.4721168 3e-7 39.6467924 3e-7 29.9869344c0-14.8753747 10.506778-27.18854591 25.2744118-29.61975392 6.0281072-.9924119 12.7038532.04926445 18.2879399 2.85362966C57.1386273 10.0389054 63.3436516 25.7618627 58.2050229 40.3239688 54.677067 50.3216743 45.4153135 57.9417536 34.81395 59.5689067c-2.0856252.3201125-5.0651487.5086456-6.3276247.4003916z" fill="#3B5998" fill-rule="nonzero"></path>
                  <path d="M25.7305108 45h5.4583577V30.0073333h4.0947673l.8098295-4.6846666h-4.9045968V21.928c0-1.0943333.7076019-2.2433333 1.7188899-2.2433333h2.7874519V15h-3.4161354v.021c-5.3451414.194-6.4433395 3.2896667-6.5385744 6.5413333h-.0099897v3.7603334H23v4.6846666h2.7305108V45z" fill="#FFF"></path>
                </g>
              </svg>
            </div>
            <p className="mb-0 mt-2 fs-13 text-center text-white">Facebook</p>
          </div>

          <div className="share_options_wrap cursor-pointer" onClick={handleShareToTwitter}>
            <div className="share_options" style={{ background: 'transparent', color: '#888' }}>
              <svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}>
                <rect width="192" height="192" rx="96" fill="black"></rect>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M42 47H76L100 78.5L127 47H144L107.5 88.5L150 145H117L91 111L61 145H44L83 100.5L42 47ZM62 57H71.5L130.5 135H121.5L62 57Z" fill="white"></path>
              </svg>
            </div>
            <p className="mb-0 mt-2 fs-13 text-center text-white">X</p>
          </div>

          <div className="share_options_wrap cursor-pointer" onClick={handleShareToMail}>
            <div className="share_options" style={{ background: 'transparent', color: '#888' }}>
              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}>
                <path fill="#F4F4F4" d="M2 5v14h20V5H2zm19 1v.88l-9 6.8-9-6.8V6h18zM3 18V8.13l9 6.8 9-6.8V18H3z"></path>
              </svg>
            </div>
            <p className="mb-0 mt-2 fs-13 text-center text-white">Mail</p>
          </div>

          <div className="share_options_wrap cursor-pointer" onClick={handleShareToLinkedIn}>
            <div className="share_options" style={{ background: 'transparent', color: '#888' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" focusable="false" aria-hidden="true" style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}>
                <g fill="none" fill-rule="evenodd">
                  <path d="M28.4863253 59.9692983c-6.6364044-.569063-11.5630204-2.3269561-16.3219736-5.8239327C4.44376366 48.4721168 3e-7 39.6467924 3e-7 29.9869344c0-14.8753747 10.506778-27.18854591 25.2744118-29.61975392 6.0281072-.9924119 12.7038532.04926445 18.2879399 2.85362966C57.1386273 10.0389054 63.3436516 25.7618627 58.2050229 40.3239688 54.677067 50.3216743 45.4153135 57.9417536 34.81395 59.5689067c-2.0856252.3201125-5.0651487.5086456-6.3276247.4003916z" fill="#0077B5" fill-rule="nonzero"></path>
                  <g fill="#FFF">
                    <path d="M17.88024691 22.0816337c2.14182716 0 3.87817284-1.58346229 3.87817284-3.53891365C21.75841975 16.58553851 20.02207407 15 17.88024691 15 15.73634568 15 14 16.58553851 14 18.54272005c0 1.95545136 1.73634568 3.53891365 3.88024691 3.53891365M14.88888889 44.8468474h6.95851852V24.77777778h-6.95851852zM31.6137778 33.6848316c0-2.3014877 1.0888889-4.552108 3.6925432-4.552108 2.6036543 0 3.2438518 2.2506203 3.2438518 4.4970883v10.960701h6.9274074V33.1816948c0-7.9263084-4.6853333-9.29280591-7.5676049-9.29280591-2.8798518 0-4.4682469.9740923-6.2961975 3.33440621v-2.70185178h-6.9471111V44.5905129h6.9471111V33.6848316z"></path>
                  </g>
                </g>
              </svg>
            </div>
            <p className="mb-0 mt-2 fs-13 text-center text-white">LinkedIn</p>
          </div>
        </div>

        <div className="link_display d-flex justify-content-between align-center mt-4 p-2 pl-3" style={{ borderRadius: '10px', background: 'black', }}>
          <span className="text-white fs-14" style={{ whiteSpace: 'nowrap', display: 'block', width: '85%', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '2.4' }}>http://{postLink}</span>
          <button className="px-3 fs-12 fw-600 py-2" style={{ background: 'white', color: 'black', borderRadius: '40px', }}
            onClick={() => {
              navigator.clipboard.writeText(postLink).then(() => {
                toast.success('Post link copied!');
              }).catch(err => {
                console.error('Could not copy text: ', err);
              });
            }}>Copy</button>
        </div>

        {/* <!-- end share --> */}

        <summary role="button" className="d-flex modal__close confirmation mt-4" onClick={() => setIsSharePostDialogOpen(false)} >
          <a className="button px-4 fs-14 mx-auto" style={{ width: 'fit-content', borderRadius: '40px' }}>
            Done
          </a>
        </summary>
      </div>
    </>
  );
}
