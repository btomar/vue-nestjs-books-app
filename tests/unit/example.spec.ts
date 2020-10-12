import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import BooksList from "@/components/book/BooksList.vue";

describe("BooksList.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(BooksList, {
      props: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });
});
