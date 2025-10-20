"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import axiosInstance from "../../../axiosInstance";
import config from "@/config";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import LoadingIcons from "react-loading-icons";
import {
  DateTimeFormat,
  formatDateToDMY,
  fullNameDateFormat,
  formatDateToDMYWithHyphen,
  formatDateToToFullYear,
  formatDateToFullYear,
} from "../../../../useDateFormat";
import Link from "next/link";
import bus from "@/app/bus";

export default function PostComments({ PostDetailsData }) {
  const textareaRef = useRef(null);
  const textareaRefSub = useRef(null);
  const [editMode, setEditMode] = useState(false); // Track if in edit mode

  const editableRef = useRef(null);

  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [CommentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paramId, setParamId] = useState(null);
  const [IsLiked, setIsLiked] = useState(false);
  const [IsSubmittingComment, setIsSubmittingComment] = useState(false);
  const [IsSubmittingReply, setIsSubmittingReply] = useState(false);
  const [IsSubmittingEditedReply, setIsSubmittingEditedReply] = useState(false);
  const [CommentFieldVal, setCommentFieldVal] = useState("");
  const [ReplyFieldVal, setReplyFieldVal] = useState("");
  const [EditReplyFieldVal, setEditReplyFieldVal] = useState("");
  const [EditSubReplyFieldVal, setEditSubReplyFieldVal] = useState("");
  const [EditSubReplyFieldTag, setEditSubReplyFieldTag] = useState("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [openReplyDropdownIndex, setOpenReplyDropdownIndex] = useState(null);
  const [openReplyBoxIndex, setOpenReplyBoxIndex] = useState(null);
  const [openEditReplyBoxIndex, setOpenEditReplyBoxIndex] = useState(null);
  const [openEditSubReplyBoxIndex, setOpenEditSubReplyBoxIndex] =
    useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [DeleteCommentId, setDeleteCommentId] = useState(null);
  const [EditCommentId, setEditCommentId] = useState(null);
  const [DeleteReplyId, setDeleteReplyId] = useState(null);
  const [EditReplyId, setEditReplyId] = useState(null);
  const [ReplyParentId, setReplyParentId] = useState(null);
  const [EditReplyParentId, setEditReplyParentId] = useState(null);
  const [ReplyBoxOpen, setReplyBoxOpen] = useState(false);
  //   const [EditReplyBoxOpen, setEditReplyBoxOpen] = useState(false);
  const [getAuth, setGetAuth] = useState(
    JSON.parse(localStorage.getItem("auth_data"))
  );

  const handleCancelResponse = () => {
    setOpenDropdownIndex(null);
    setOpenReplyDropdownIndex(null);
    setOpenReplyBoxIndex(null);
    setOpenEditReplyBoxIndex(null);
    setOpenEditSubReplyBoxIndex(null);

    setDeleteCommentId(null);
    setEditCommentId(null);
    setDeleteReplyId(null);
    setEditReplyId(null);
    setReplyParentId(null);
    setEditReplyParentId(null);
    setEditCommentId(null);
    setCommentFieldVal("");
    // setReplyBoxOpen(false);
  };

  const handlePostButtonClick = (event, index) => {
    event.preventDefault();
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle the specific dropdown
  };

  const handleReplyButtonClick = (event, index) => {
    event.preventDefault();
    setOpenReplyDropdownIndex((prevIndex) =>
      prevIndex === index ? null : index
    ); // Toggle the specific dropdown
  };

  const handleOpenReplyBox = (event, index) => {
    event.preventDefault();
    setReplyFieldVal("");
    setReplyParentId(null);
    setOpenReplyBoxIndex(null);
    setOpenEditReplyBoxIndex(null);
    setOpenEditSubReplyBoxIndex(null);
    setReplyBoxOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleToggleEditSubReply = (event, index, item) => {
    event.preventDefault();
    setEditReplyParentId(null);
    setOpenEditSubReplyBoxIndex((prevIndex) =>
      prevIndex === index ? null : index
    ); // Toggle the specific dropdown
    setEditSubReplyFieldVal("");

    // setEditReplyBoxOpen((prevIndex) => (prevIndex === index ? null : index));
    setEditReplyParentId(item.parent_id);
  };

  const handleToggleEditReply = (event, index, item) => {
    event.preventDefault();
    setEditReplyParentId(null);
    setOpenEditReplyBoxIndex((prevIndex) =>
      prevIndex === index ? null : index
    ); // Toggle the specific dropdown
    setEditReplyFieldVal("");

    // setEditReplyBoxOpen((prevIndex) => (prevIndex === index ? null : index));
    setEditReplyParentId(item.parent_id);
  };

  const handleToggleReply = (event, index, item) => {
    event.preventDefault();
    setReplyParentId(null);
    setOpenReplyBoxIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle the specific dropdown
    setReplyFieldVal("");
    setReplyParentId(item.id);
    setOpenEditReplyBoxIndex(null);
    setOpenEditSubReplyBoxIndex(null);
    // setReplyBoxOpen(null)
  };

  const handlePostOptionClick = (text) => {
    setOpenDropdownIndex(null); // Close the dropdown when an option is clicked
  };

  const handleOptionClick = (text, item) => {
    setIsDropdownOpen(false); // Close dropdown when an option is clicked
    setOpenDropdownIndex(null);
    setDeleteCommentId(null);
    setDeleteReplyId(null);
    setOpenReplyBoxIndex(null);
    setOpenEditReplyBoxIndex(null);
    setOpenEditSubReplyBoxIndex(null);

    if (text === "delete") {
      setDeleteCommentId(item.comment_id);
      setIsDeleteDialogOpen(!isDeleteDialogOpen);
      setOpenDropdownIndex(null);
    } else if (text === "edit") {
      setEditCommentId(item.comment_id);
      setCommentFieldVal(item.content);

      // Perform smooth scroll to the bottom of the page
      window.scrollTo({
        top: document.documentElement.scrollHeight, // Scroll to the bottom of the page
        behavior: "smooth", // Smooth scroll effect
      });
    }
  };

  const handleReplyOptionClick = (event, index, text, item) => {
    setIsDropdownOpen(false); // Close dropdown when an option is clicked
    setOpenReplyDropdownIndex(null);
    setDeleteCommentId(null);
    setDeleteReplyId(null);
    setOpenReplyBoxIndex(null);
    setEditCommentId(null);
    setCommentFieldVal("");
    setOpenEditReplyBoxIndex(null);
    setOpenEditSubReplyBoxIndex(null);

    if (text === "delete") {
      setDeleteReplyId(item.comment_id);
      setIsDeleteDialogOpen(!isDeleteDialogOpen);
      setOpenEditReplyBoxIndex(null);
      setOpenEditSubReplyBoxIndex(null);
    } else if (text === "edit") {
      handleToggleEditReply(event, index, item);
      setEditReplyId(item.comment_id);

      setEditReplyFieldVal(item.content);

      if (textareaRef.current) {
        // Adding a small timeout to ensure focus happens after render
        setTimeout(() => {
          textareaRef.current.focus();
          setTimeout(() => {
            textareaRef.current.setSelectionRange(
              textareaRef.current.value.length,
              textareaRef.current.value.length
            );
          }, 500);
        }, 500);
      }

      // Perform smooth scroll to the bottom of the page
      //   window.scrollTo({
      //       // top: document.documentElement.scrollHeight, // Scroll to the bottom of the page
      //       top: 500, // Scroll to the bottom of the page
      //     behavior: "smooth", // Smooth scroll effect
      //   });
    } else if (text === "subreply") {
      handleToggleEditSubReply(event, index, item);
      setEditReplyId(item.comment_id);

      setEditSubReplyFieldVal('');
      setEditSubReplyFieldTag(`@${item.tag}`);

      if (textareaRefSub.current) {
        // Adding a small timeout to ensure focus happens after render
        setTimeout(() => {
          textareaRefSub.current.focus();
          setTimeout(() => {
            textareaRefSub.current.setSelectionRange(
              textareaRefSub.current.value.length,
              textareaRefSub.current.value.length
            );
          }, 0);
        }, 500);
      }
    }
  };

  const fetchAllComments = async (id) => {
    if (!id) {
      console.error("No channel ID found in the URL.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get(
        `${config.BASE_URL}/accounts/channels/posts/comments/${id}`
      );

      if (response.status < 300 || response.data.success) {

        setCommentsData(response.data.data);
        setGetAuth(JSON.parse(localStorage.getItem('auth_data')));

      } else {
        console.error(
          "Failed to fetch channel details:",
          response.data.message
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error fetching channel details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setParamId(params.id);
    // Wait for the router to be ready

    if (paramId) {
    console.log('getAuth:', getAuth);

      fetchAllComments(paramId);
    }
  }, [paramId]);

  const handleSubmitReply = async (e) => {
    e.preventDefault();

    if (!params.id) {
      console.error("No comment ID found in the URL.");
      setIsSubmittingReply(false);
      return;
    }
    if (!ReplyFieldVal) {
      toast.error("The reply field is required.");
      return;
    }
    let payload = {
      post_id: params.id,
      content: ReplyFieldVal,
      parent_id: ReplyParentId,
    };

    setIsSubmittingReply(true);
    try {
      let response = await axiosInstance.post(
        `${config.BASE_URL}/accounts/channels/posts/comments`,
        payload
      );

      if (response.status < 300 || response.data.success) {
        toast.success(response.data.message);

        const auth = JSON.parse(localStorage.getItem('auth_data'));
        if (auth.user?.active_channel === null) {
          auth.user.active_channel = response.data?.data?.channel_id;
          localStorage.setItem('auth_data', JSON.stringify(auth));
        }
        bus.emit("refreshPostData", true);
        setReplyFieldVal("");
        setEditCommentId(null);
        fetchAllComments(paramId);
        setOpenReplyBoxIndex(null);
        setCommentFieldVal("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("An error occured: ", error);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleSubmitEditedReply = async (e, text) => {
    e.preventDefault();

    if (!params.id) {
      console.error("No reply ID found in the URL.");
      setIsSubmittingEditedReply(false);
      return;
    }
    if (text === 'reply') {
      if (!EditReplyFieldVal) {
        toast.error("The reply field is required.");
        return;
      }
      let payload = {
        post_id: params.id,
        content: EditReplyFieldVal,
        parent_id: EditReplyParentId,
      };
  
      setIsSubmittingEditedReply(true);
      try {
        let response = await axiosInstance.put(
          `${config.BASE_URL}/accounts/channels/posts/comments/${EditReplyId}`,
          payload
        );
        //   let response = await axiosInstance.post(
        //     `${config.BASE_URL}/accounts/channels/posts/comments`,
        //     payload
        //   );
  
        if (response.status < 300 || response.data.success) {
          toast.success(response.data.message);

          const auth = JSON.parse(localStorage.getItem('auth_data'));
          if (auth.user?.active_channel === null) {
            auth.user.active_channel = response.data?.data?.channel_id;
            localStorage.setItem('auth_data', JSON.stringify(auth));
          }
          bus.emit("refreshPostData", true);
          setEditReplyFieldVal("");
          setEditReplyId(null);
          fetchAllComments(paramId);
          setOpenEditReplyBoxIndex(null);
          setOpenEditSubReplyBoxIndex(null);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.error("An error occured: ", error);
      } finally {
        setIsSubmittingEditedReply(false);
      }

    } else if (text === 'subreply') {
      if (!EditSubReplyFieldVal) {
        toast.error("The reply field is required.");
        return;
      }
      let payload = {
        post_id: params.id,
        content: `${EditSubReplyFieldTag} ${EditSubReplyFieldVal}`,
        parent_id: EditReplyParentId,
      };
  
      setIsSubmittingEditedReply(true);

      try {
        let response = await axiosInstance.post(
          `${config.BASE_URL}/accounts/channels/posts/comments`,
          payload
        );
  
        if (response.status < 300 || response.data.success) {
              setEditReplyFieldVal("");
              setEditSubReplyFieldVal("");
              setEditReplyId(null);
              fetchAllComments(paramId);
              setOpenEditReplyBoxIndex(null);
              setOpenEditSubReplyBoxIndex(null);
          toast.success(response.data.message);

          const auth = JSON.parse(localStorage.getItem('auth_data'));
          if (auth.user?.active_channel === null) {
            auth.user.active_channel = response.data?.data?.channel_id;
            localStorage.setItem('auth_data', JSON.stringify(auth));
          }
          bus.emit("refreshPostData", true);
          setReplyFieldVal("");
          setEditCommentId(null);
          fetchAllComments(paramId);
          setOpenReplyBoxIndex(null);
          setCommentFieldVal("");
        } else {
          toast.error(response.data.message);
        }
      // try {
      //   let response = await axiosInstance.put(
      //     `${config.BASE_URL}/accounts/channels/posts/comments/${EditReplyId}`,
      //     payload
      //   );
      //   //   let response = await axiosInstance.post(
      //   //     `${config.BASE_URL}/accounts/channels/posts/comments`,
      //   //     payload
      //   //   );
  
      //   if (response.status < 300 || response.data.success) {
      //     toast.success(response.data.message);
      //     bus.emit("refreshPostData", true);
      //     setEditReplyFieldVal("");
      //     setEditReplyId(null);
      //     fetchAllComments(paramId);
      //     setOpenEditReplyBoxIndex(null);
      //     setOpenEditSubReplyBoxIndex(null);
      //   } else {
      //     toast.error(response.data.message);
      //   }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.error("An error occured: ", error);
      } finally {
        setIsSubmittingEditedReply(false);
      }
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!params.id) {
      console.error("No comment ID found in the URL.");
      setIsSubmittingComment(false);
      return;
    }
    if (!CommentFieldVal) {
      toast.error("Shey o mugbo ni 😒, add a comment jhoor");
      return;
    }

    setIsSubmittingComment(true);
    let response;
    try {
      if (EditCommentId) {
        response = await axiosInstance.put(
          `${config.BASE_URL}/accounts/channels/posts/comments/${EditCommentId}`,
          {
            content: CommentFieldVal,
          }
        );
      } else {
        response = await axiosInstance.post(
          `${config.BASE_URL}/accounts/channels/posts/comments`,
          {
            post_id: params.id,
            content: CommentFieldVal,
            channel_id: getAuth.user.active_channel,
          }
        );
      }

      if (response.status < 300 || response.data.success) {
        toast.success(response.data.message);

        const auth = JSON.parse(localStorage.getItem('auth_data'));
        if (auth.user?.active_channel === null) {
          auth.user.active_channel = response.data?.data?.channel_id;
          localStorage.setItem('auth_data', JSON.stringify(auth));
        }

        bus.emit("refreshPostData", true);
        setCommentFieldVal("");
        setEditCommentId(null);
        fetchAllComments(paramId);

        // if (response.data.message === "Post liked successfully") {
        //     setIsLiked(true);
        // } else if (response.data.message === "Post undisliked successfully" ||
        //     response.data.message === "Post unliked successfully"
        // ) {
        //     setIsLiked(false);
        // } else {
        //     setIsLiked(true);
        // }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("An error occured: ", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleConfirmDelete = async (val) => {
    setIsDeleteDialogOpen(false);
    setCommentFieldVal("");
    setReplyFieldVal("");

    if (val === true) {
      setIsDeleting(true);
      if (DeleteCommentId && !DeleteReplyId) {

        try {
          const response = await axiosInstance.delete(
            `${config.BASE_URL}/accounts/channels/posts/comments/${DeleteCommentId}`
          );

          if (response.status === 200) {
            toast.success(response.data.message);
            bus.emit("refreshPostData", true);
            setDeleteCommentId(null);
            fetchAllComments(paramId);
          } else {
            if (response.data && response.data.message) {
              toast.error(response.data.message);
            } else {
              toast.error("Failed to delete reply.");
            }
          }
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            toast.error(error.response.data.message);
          } else {
            console.error("Failed to delete reply:", error);
            toast.error("Failed to delete reply.");
          }
        } finally {
          setIsDeleting(false);
        }
      } else if (DeleteReplyId && !DeleteCommentId) {

        try {
          const response = await axiosInstance.delete(
            `${config.BASE_URL}/accounts/channels/posts/comments/${DeleteReplyId}`
          );

          if (response.status === 200) {
            toast.success(response.data.message);
            bus.emit("refreshPostData", true);
            setDeleteReplyId(null);
            fetchAllComments(paramId);
          } else {
            if (response.data && response.data.message) {
              toast.error(response.data.message);
            } else {
              toast.error("Failed to delete reply.");
            }
          }
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            toast.error(error.response.data.message);
          } else {
            console.error("Failed to delete reply:", error);
            toast.error("Failed to delete reply.");
          }
        } finally {
          setIsDeleting(false);
        }
      }
    } else {
      setDeleteCommentId(null);
    }
  };

  const formatCommentContent = (obj) => {
    const words = obj.content.split(' ');
    return words.map((word, index) => {
      if (word.startsWith('@')) {
        const mention = word.slice(1);
        return (
          <React.Fragment key={index}>
            <Link href={`/streamers/channels/single/${mention}`} className="mention">@{mention}</Link>
            {' '}
          </React.Fragment>
        );
      }
      return word + ' ';
    });
  };

  // useEffect(() => {
  //     // Set the initial value of the contenteditable div
  //     if (editableRef.current) {
  //       editableRef.current.innerHTML = formatText(EditReplyFieldVal);
  //     }
  //   }, [EditReplyFieldVal]);

  //   const formatText = (text) => {
  //     // Convert the @mention text into a span element
  //     // Prevent duplication of mentions and handle special characters
  //     const mentionRegex = /@(\w+)/g;
  //     // Check for existing formatted mentions to avoid duplication
  //     const alreadyFormattedRegex = /<span className="mention">@(\w+)<\/span>/g;

  //     // If the tag already exists as a formatted span, do not duplicate
  //     let formattedText = text.replace(alreadyFormattedRegex, "@$1");

  //     // Apply formatting to unformatted mentions
  //     formattedText = formattedText.replace(
  //       mentionRegex,
  //       `<span className="mention">@$1</span>`
  //     );

  //     return formattedText;
  //   };

  //   const handleInput = () => {
  //     // Capture the current text including HTML elements
  //     const textContent = editableRef.current.innerText;
  //     setEditReplyFieldVal(EditReplyFieldVal);
  //     setFormattedEditReplyFieldVal(textContent);
  //   };

  //   const handleKeyDown = (e) => {
  //     // Detect if the cursor is near the mention span and handle backspace
  //     if (e.key === "Backspace") {
  //       const selection = window.getSelection();
  //       const range = selection.getRangeAt(0);
  //       const { startContainer, startOffset } = range;

  //       // Check if the cursor is at the beginning of the mention span
  //       if (startContainer.nodeType === Node.TEXT_NODE && startOffset === 0) {
  //         const previousNode = startContainer.previousSibling;
  //         if (previousNode && previousNode.nodeName === "SPAN" && previousNode.classList.contains("mention")) {
  //           e.preventDefault(); // Prevent default backspace behavior
  //           previousNode.remove(); // Remove the entire mention tag
  //         }
  //       }
  //     }
  //   };

  // const handleDisLike = async () => {
  //     if (!params.id) {
  //         console.error("No comment ID found in the URL.");
  //         setIsSubmittingComment(false);
  //         return;
  //     }

  //     setIsSubmittingComment(true);

  //     try {
  //         const response = await axiosInstance.post(`${config.BASE_URL}/accounts/channels/posts/dislike`, {
  //             post_id: params.id
  //         });

  //         if (response.status < 300 || response.data.success) {
  //             if (response.data.message === "Post liked successfully") {
  //                 setIsLiked(true);
  //             } else if (response.data.message === "Post undisliked successfully" ||
  //                 response.data.message === "Post unliked successfully"
  //             ) {
  //                 setIsLiked(false);
  //             } else {
  //                 setIsLiked(false);
  //             }
  //         } else {
  //             toast.error(response.data.message);
  //         }
  //     } catch (error) {
  //         console.error("Failed to delete comment:", error);
  //     } finally {
  //         setIsSubmittingComment(false);
  //     }
  // };

  return (
    <>
      {isDeleting && (
        <div
          className="border d-flex justify-content-center align-items-center"
          style={{
            position: "sticky",
            top: "10px",
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            background: "white",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "10",
          }}
        >
          <CircularProgress
            style={{ stroke: "#000", strokeWidth: "4px" }}
            className="position-relative"
            size="1rem"
            sx={{ strokeWidth: "4px" }}
          />
        </div>
      )}

      {/* <!-- comments --> */}
      <div className="comments mb-5">
        <div className="comments__title">
          <h4>Comments</h4>
          <span className="" style={{ transform: "translateY(3px)" }}>
            {PostDetailsData.post.total_comments}
          </span>
        </div>

        {loading ? (
          <div
            className="loader-container"
            style={{ width: "fit-content", margin: "auto" }}
          >
            <LoadingIcons.ThreeDots width="50px" height="50px" />
          </div>
        ) : CommentsData.length === 0 ? (
          <div
            className="empty-text text-center fit-content mx-auto py-4"
            style={{ color: "#ffff" }}
          >
            No comments yet 😧
          </div>
        ) : (
          <>
            {CommentsData.length > 0 ? (
              <>
                <ul className="comments__list">
                  {CommentsData.map((item, index) => (
                    <li className="comments__item" key={item.id || index}>
                      <div className="comments__autor d-flex justify-content-between align-items-center">
                        <div>
                          <img
                            className="comments__avatar"
                            src="/img/avatar.svg"
                            alt=""
                          />
                          <span className="comments__name">
                            {item?.channel_name}
                          </span>
                          <span className="comments__time">
                            <span className="" style={{ color: "#999;" }}>
                              @{item?.tag}
                            </span>
                            <i
                              className="bi bi-dot fs-18"
                              style={{ verticalAlign: "middle" }}
                            ></i>
                            {fullNameDateFormat(item.created_at)}
                          </span>
                        </div>

                        <details
                          className="dropdown"
                          open={openDropdownIndex === index}
                        >
                          <summary
                            role="button"
                            onClick={(event) =>
                              handlePostButtonClick(event, index)
                            }
                          >
                            <a className="button">
                              <i className="bi bi-three-dots-vertical"></i>
                            </a>
                          </summary>
                          <ul>
                            <li>
                              <a
                                className="open-modal"
                                onClick={() => handleOptionClick("edit", item)}
                              >
                                <i className="bi bi-pen mr-2 fs-16"></i> Edit
                              </a>
                            </li>
                            <li>
                              <Link
                                href={`#modal-info3`}
                                className="open-modal"
                                onClick={() =>
                                  handleOptionClick("delete", item)
                                }
                              >
                                <i className="bi bi-trash mr-2 fs-16"></i>{" "}
                                Delete
                              </Link>
                            </li>
                          </ul>
                        </details>
                      </div>
                      <p className="comments__text">{item.content}</p>
                      <div className="comments__actions">
                        <div className="comments__rate">
                          <button
                            type="button"
                            onClick={(event) => {
                              item.children.length
                                ? handleOpenReplyBox(event, index)
                                : null;
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V19ZM16 11H8C7.73478 11 7.48043 11.1054 7.29289 11.2929C7.10536 11.4804 7 11.7348 7 12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H16C16.2652 13 16.5196 12.8946 16.7071 12.7071C16.8946 12.5196 17 12.2652 17 12C17 11.7348 16.8946 11.4804 16.7071 11.2929C16.5196 11.1054 16.2652 11 16 11Z" />
                              {ReplyBoxOpen !== index && (
                                <path d="M13 16V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7C11.7348 7 11.4804 7.10536 11.2929 7.29289C11.1054 7.48043 11 7.73478 11 8V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16Z" />
                              )}
                            </svg>{" "}
                            {item.children.length}{" "}
                            {item.children.length > 1 ? "Replies" : "Reply"}{" "}
                          </button>
                          {/* <button type="button">
                            7
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V19ZM16 11H8C7.73478 11 7.48043 11.1054 7.29289 11.2929C7.10536 11.4804 7 11.7348 7 12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H16C16.2652 13 16.5196 12.8946 16.7071 12.7071C16.8946 12.5196 17 12.2652 17 12C17 11.7348 16.8946 11.4804 16.7071 11.2929C16.5196 11.1054 16.2652 11 16 11Z" />
                            </svg>
                          </button> */}
                        </div>

                        <button
                          type="button"
                          onClick={(event) =>
                            handleToggleReply(event, index, item)
                          }
                          className="ml-4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21.707,11.293l-8-8A.99991.99991,0,0,0,12,4V7.54492A11.01525,11.01525,0,0,0,2,18.5V20a1,1,0,0,0,1.78418.62061,11.45625,11.45625,0,0,1,7.88672-4.04932c.0498-.00635.1748-.01611.3291-.02588V20a.99991.99991,0,0,0,1.707.707l8-8A.99962.99962,0,0,0,21.707,11.293ZM14,17.58594V15.5a.99974.99974,0,0,0-1-1c-.25488,0-1.2959.04932-1.56152.085A14.00507,14.00507,0,0,0,4.05176,17.5332,9.01266,9.01266,0,0,1,13,9.5a.99974.99974,0,0,0,1-1V6.41406L19.58594,12Z" />
                          </svg>
                          <span>Reply</span>
                        </button>
                        {/* <button type="button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M10.3,10.75A1,1,0,1,0,9,9.25,3,3,0,1,1,7,4,3,3,0,0,1,9.23,5H8A1,1,0,0,0,8,7h3a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0h0a5,5,0,1,0,.3,7.75ZM19,6H15a1,1,0,0,0,0,2h4a1,1,0,0,1,1,1v9.72l-1.57-1.45a1,1,0,0,0-.68-.27H9a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v1a3,3,0,0,0,3,3h8.36l3,2.73A1,1,0,0,0,21,22a1.1,1.1,0,0,0,.4-.08A1,1,0,0,0,22,21V9A3,3,0,0,0,19,6Z" />
                          </svg>
                          <span>Quote</span>
                        </button> */}
                      </div>

                      {openReplyBoxIndex === index && (
                        <form
                          onSubmit={handleSubmitReply}
                          className="comments__form for_reply"
                        >
                          <div className="sign__group">
                            <textarea
                              value={ReplyFieldVal}
                              onChange={(e) => setReplyFieldVal(e.target.value)}
                              id="text"
                              name="text"
                              className="sign__textarea"
                              placeholder="Add a Reply..."
                              rows={2}
                            ></textarea>
                          </div>
                          <div className="ml-auto d-flex fit-content">
                            <button
                              type="button"
                              className="sign__btn cancel mt-1 d-block ml-auto px-3 py-2 fs-13 mr-2"
                              style={{
                                width: "auto",
                                height: "auto",
                                borderRadius: "5px",
                                textTransform: "capitalize",
                              }}
                              onClick={handleCancelResponse}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="sign__btn mt-1 d-block ml-auto px-4 py-2"
                              style={{
                                width: "auto",
                                height: "auto",
                                borderRadius: "8px",
                                textTransform: "capitalize",
                              }}
                            >
                              {IsSubmittingReply ? (
                                <LoadingIcons.ThreeDots
                                  max={30}
                                  width={30}
                                  height={20}
                                />
                              ) : (
                                "Reply"
                              )}
                            </button>
                          </div>
                        </form>
                      )}

                      <div
                        className={`w-100 reply_box_wrap ${
                          ReplyBoxOpen === index ? "addOpen_ mt-4" : ""
                        } pl-4`}
                        style={{}}
                      >
                        <ul className="comments__list">
                          {item.children.map((child, c_index) => (
                            <li
                              className="comments__item"
                              key={child.id || `${index}-${c_index}`}
                            >
                              <div className="comments__autor d-flex justify-content-between align-items-center">
                                <div>
                                  <img
                                    className="comments__avatar"
                                    src="/img/avatar.svg"
                                    alt=""
                                  />
                                  <span className="comments__name">
                                    {child.channel_name}
                                  </span>
                                  <span className="comments__time">
                            <span className="" style={{ color: "#999;" }}>
                              @{child?.tag}
                            </span>
                            <i
                              className="bi bi-dot fs-18"
                              style={{ verticalAlign: "middle" }}
                            ></i>
                                    {fullNameDateFormat(child.created_at)}
                                  </span>
                                </div>

                                <details
                                  className="dropdown"
                                  open={openReplyDropdownIndex === c_index}
                                >
                                  <summary
                                    role="button"
                                    onClick={(event) =>
                                      handleReplyButtonClick(event, c_index)
                                    }
                                  >
                                    <a className="button">
                                      <i className="bi bi-three-dots-vertical"></i>
                                    </a>
                                  </summary>
                                  <ul>
                                    <li>
                                      <a
                                        className="open-modal"
                                        onClick={(event) =>
                                          handleReplyOptionClick(
                                            event,
                                            c_index,
                                            "subreply",
                                            child
                                          )
                                        }
                                      >
                                        <i className="bi bi-reply mr-2 fs-16"></i>{" "}
                                        Reply
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="open-modal"
                                        onClick={(event) =>
                                          handleReplyOptionClick(
                                            event,
                                            c_index,
                                            "edit",
                                            child
                                          )
                                        }
                                      >
                                        <i className="bi bi-pen mr-2 fs-16"></i>{" "}
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <Link
                                        href={`#modal-info3`}
                                        className="open-modal"
                                        onClick={(event) =>
                                          handleReplyOptionClick(
                                            event,
                                            c_index,
                                            "delete",
                                            child
                                          )
                                        }
                                      >
                                        <i className="bi bi-trash mr-2 fs-16"></i>{" "}
                                        Delete
                                      </Link>
                                    </li>
                                  </ul>
                                </details>
                              </div>
                              {/* <p className="comments__text">{child.content}</p> */}
                              <p className="comments__text">
                              {formatCommentContent(child)}
                              </p>

                              {openEditSubReplyBoxIndex === c_index && (
                                <>
                                <small className="d-block fit-content text-left mt-2 mention replying_to px-2 py-1">replying to {child.tag}</small>
                                <form
                                  onSubmit={(e) =>
                                    handleSubmitEditedReply(e, "subreply")
                                  }
                                  className="comments__form for_reply"
                                >
                                  <div className="sign__group">
                                    <textarea
                                      ref={textareaRefSub}
                                      value={EditSubReplyFieldVal}
                                      onChange={(e) =>
                                        setEditSubReplyFieldVal(e.target.value)
                                      }
                                      id="text"
                                      name="text"
                                      className="sign__textarea p-2 px-3"
                                      placeholder="Add a Reply"
                                      rows={2}
                                    ></textarea>
                                  </div>
                                  <div className="ml-auto d-flex fit-content">
                                    <button
                                      type="button"
                                      className="sign__btn cancel d-block ml-auto px-3 py-2 fs-13 mr-2"
                                      style={{
                                        width: "auto",
                                        height: "auto",
                                        borderRadius: "5px",
                                        textTransform: "capitalize",
                                      }}
                                      onClick={handleCancelResponse}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="submit"
                                      className="sign__btn d-block ml-auto px-3 py-2 fs-13"
                                      style={{
                                        width: "auto",
                                        height: "auto",
                                        borderRadius: "5px",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {IsSubmittingEditedReply ? (
                                        <LoadingIcons.ThreeDots
                                          max={30}
                                          width={30}
                                          height={20}
                                        />
                                      ) : (
                                        "Reply"
                                      )}
                                    </button>
                                  </div>
                                </form>
                                </>
                              )}

                              {openEditReplyBoxIndex === c_index && (
                                <form
                                  onSubmit={(e) =>
                                    handleSubmitEditedReply(e, "reply")
                                  }
                                  className="comments__form for_reply"
                                >
                                  <div className="sign__group">
                                    {/* <div
                                      ref={editableRef}
                                      contentEditable
                                      className="sign__textarea p-2 px-3"
                                      value={EditReplyFieldVal}
                                      onChange={(event) => {'contentEditable:',console.log(event.target.value, event.value)}}
                                      onInput={handleInput}
                                      onKeyDown={handleKeyDown}
                                      style={{
                                        whiteSpace: "pre-wrap",
                                        minHeight: "80px",
                                        borderRadius: "4px",
                                        padding: "8px",
                                        color: "white",
                                        backgroundColor: "#222227",
                                        overflowY: 'auto'
                                      }}
                                    ></div> */}

                                    <textarea
                                      ref={textareaRef}
                                      value={EditReplyFieldVal}
                                      onChange={(e) =>
                                        setEditReplyFieldVal(e.target.value)
                                      }
                                      id="text"
                                      name="text"
                                      className="sign__textarea p-2 px-3"
                                      placeholder="Add a Reply"
                                      rows={2}
                                    ></textarea>
                                  </div>
                                  <div className="ml-auto d-flex fit-content">
                                    <button
                                      type="button"
                                      className="sign__btn cancel d-block ml-auto px-3 py-2 fs-13 mr-2"
                                      style={{
                                        width: "auto",
                                        height: "auto",
                                        borderRadius: "5px",
                                        textTransform: "capitalize",
                                      }}
                                      onClick={handleCancelResponse}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="submit"
                                      className="sign__btn d-block ml-auto px-3 py-2 fs-13"
                                      style={{
                                        width: "auto",
                                        height: "auto",
                                        borderRadius: "5px",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {IsSubmittingEditedReply ? (
                                        <LoadingIcons.ThreeDots
                                          max={30}
                                          width={30}
                                          height={20}
                                        />
                                      ) : (
                                        "Update"
                                      )}
                                    </button>
                                  </div>
                                </form>
                              )}

                              {/* <div className="comments__actions">
                                    <div className="comments__rate">
                                        <button type="button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V19ZM16 11H8C7.73478 11 7.48043 11.1054 7.29289 11.2929C7.10536 11.4804 7 11.7348 7 12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H16C16.2652 13 16.5196 12.8946 16.7071 12.7071C16.8946 12.5196 17 12.2652 17 12C17 11.7348 16.8946 11.4804 16.7071 11.2929C16.5196 11.1054 16.2652 11 16 11Z" /><path d="M13 16V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7C11.7348 7 11.4804 7.10536 11.2929 7.29289C11.1054 7.48043 11 7.73478 11 8V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16Z" /></svg> 12</button>

                                        <button type="button">7 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V19ZM16 11H8C7.73478 11 7.48043 11.1054 7.29289 11.2929C7.10536 11.4804 7 11.7348 7 12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H16C16.2652 13 16.5196 12.8946 16.7071 12.7071C16.8946 12.5196 17 12.2652 17 12C17 11.7348 16.8946 11.4804 16.7071 11.2929C16.5196 11.1054 16.2652 11 16 11Z" /></svg></button>
                                    </div>

                                    <button type="button" onClick={(event) => handleToggleReply(event, index02, item)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.707,11.293l-8-8A.99991.99991,0,0,0,12,4V7.54492A11.01525,11.01525,0,0,0,2,18.5V20a1,1,0,0,0,1.78418.62061,11.45625,11.45625,0,0,1,7.88672-4.04932c.0498-.00635.1748-.01611.3291-.02588V20a.99991.99991,0,0,0,1.707.707l8-8A.99962.99962,0,0,0,21.707,11.293ZM14,17.58594V15.5a.99974.99974,0,0,0-1-1c-.25488,0-1.2959.04932-1.56152.085A14.00507,14.00507,0,0,0,4.05176,17.5332,9.01266,9.01266,0,0,1,13,9.5a.99974.99974,0,0,0,1-1V6.41406L19.58594,12Z" /></svg><span>Reply</span></button>
                                    <button type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.3,10.75A1,1,0,1,0,9,9.25,3,3,0,1,1,7,4,3,3,0,0,1,9.23,5H8A1,1,0,0,0,8,7h3a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0h0a5,5,0,1,0,.3,7.75ZM19,6H15a1,1,0,0,0,0,2h4a1,1,0,0,1,1,1v9.72l-1.57-1.45a1,1,0,0,0-.68-.27H9a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v1a3,3,0,0,0,3,3h8.36l3,2.73A1,1,0,0,0,21,22a1.1,1.1,0,0,0,.4-.08A1,1,0,0,0,22,21V9A3,3,0,0,0,19,6Z" /></svg><span>Quote</span></button>
                                </div> */}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h4 className="fw-500 fs-16 mb-4 text-center d-block border-top py-4">
                  No comment yet!
                </h4>
              </>
            )}
          </>
        )}

        <form onSubmit={handleSubmitComment} className="comments__form">
        {!getAuth?.user?.active_channel &&
          <div class="alert alert-primary fs-12 text-white rounded py-2 px-2 mb-3" style={{border: '1px solid rgba(104, 115, 133, 0.3)', borderRadius: '5px'}} role="alert">
            <strong className="" style={{color: '#2f80ed',}}>Note:</strong> By commenting or replying to comments on this post, a channel will be generated for your account.
          </div>
        }
          <div className="sign__group">
            <textarea
              value={CommentFieldVal}
              onChange={(e) => setCommentFieldVal(e.target.value)}
              id="text"
              name="text"
              className="sign__textarea px-4"
              placeholder="Add a comment..."
              rows={3}
            ></textarea>
          </div>
          <button
            type="submit"
            className="sign__btn d-block mr-auto px-4 py-2 fs-14 mt-3"
            style={{
              width: "auto",
              height: "auto",
              borderRadius: "5px",
              textTransform: "capitalize",
            }}
          >
            {IsSubmittingComment ? (
              <LoadingIcons.ThreeDots max={30} width={30} height={20} />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>

      <div
        id="modal-info3"
        className={`${
          isDeleteDialogOpen ? "" : "mfp-hide"
        } zoom-anim-dialog modal modal--info`}
      >
        <span className="modal__icon modal__icon--red">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.71,8.29a1,1,0,0,0-1.42,0L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L13.41,12l2.3-2.29A1,1,0,0,0,15.71,8.29Zm3.36-3.36A10,10,0,1,0,4.93,19.07,10,10,0,1,0,19.07,4.93ZM17.66,17.66A8,8,0,1,1,20,12,7.95,7.95,0,0,1,17.66,17.66Z"></path>
          </svg>
        </span>

        <button
          className="modal__close"
          onClick={() => setIsDeleteDialogOpen(false)}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
          </svg>
        </button>

        <h4 className="sign__title">Confirm deletion!</h4>

        <div className="sign__group sign__group--row">
          <span className="sign__value">Delete Post?</span>
        </div>

        <div className="sign__group sign__group--row">
          {/* <label className="sign__label">
            Payment method: <b>Paypal</b>
          </label> */}

          <span className="sign__text sign__text--small">
            Are you sure you want to delete this post? Kindly note that it will
            be totally removed from your list of created posts
          </span>

          <div className="d-flex justify-content-center border mb-4">
            <summary
              role="button"
              className={` d-flex modal__close confirmation`}
            >
              <a
                className={`button mr-2`}
                onClick={() => handleConfirmDelete(false)}
              >
                <i className="bi bi-x text-error" style={{ color: "#ccc" }}></i>
              </a>
              <a className={`button`} onClick={() => handleConfirmDelete(true)}>
                <i
                  className="bi bi-check text-error"
                  style={{ color: "#eb5757" }}
                ></i>
              </a>
            </summary>
          </div>
        </div>
      </div>
      {/* <!-- end comments --> */}
    </>
  );
}
