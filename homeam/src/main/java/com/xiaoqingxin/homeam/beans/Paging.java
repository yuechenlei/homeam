package com.xiaoqingxin.homeam.beans;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 分页中心
 *
 * @author Wu Liangxing
 */
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Paging {

    private static final int PAGINATION_STEP = 3;

    /**
     * 是否有下一页
     */
    private boolean nextEnabled;
    /**
     * 是否有上一页
     */
    private boolean prevEnabled;
    /**
     * 每页显示数量
     */
    private int pageSize;
    /**
     * 当前页码
     */
    private int pageNumber;
    /**
     * 为页码显示做准备
     */
    @Builder.Default
    private List<PageItem> items = new ArrayList<>();

    /**
     * 添加分页信息
     *
     * @param from 从第几页开始
     * @param to 到第几页为止
     * @param pageNumber 当前页码  
     *
     */
    public void addPageItems(int from, int to, int pageNumber) {
        for (int i = from; i < to; i++) {
            items.add(PageItem.builder()
                    .active(pageNumber != i)
                    .index(i)
                    .pageItemType(PageItemType.PAGE)
                    .build());
        }
    }

    /**
     * 最后一页
     *
     * @param totalPage 总页数，也就是最后一页的页码
     *
     */
    public void last(int totalPage) {
        items.add(PageItem.builder()
                .active(false)
                .pageItemType(PageItemType.DOTS)
                .build());

        items.add(PageItem.builder()
                .active(true)
                .index(totalPage)
                .pageItemType(PageItemType.PAGE)
                .build());
    }

    /**
     * 第一页
     *
     * @param pageNumber 当前页码 
     *
     */
    public void first(int pageNumber) {
        items.add(PageItem.builder()
                .active(pageNumber != 1)
                .index(1)
                .pageItemType(PageItemType.PAGE)
                .build());

        items.add(PageItem.builder()
                .active(false)
                .pageItemType(PageItemType.DOTS)
                .build());
    }

    /**
     * 分页构建器
     *
     * @param totalPages 总页数
     * @param pageNumber 当前页码
     * @param pageSize 每页数量
     *
     *
     */
    public static Paging of(int totalPages, int pageNumber, int pageSize) {
        Paging paging = new Paging();
        paging.setPageSize(pageSize);
        paging.setNextEnabled(pageNumber != totalPages);
        paging.setPrevEnabled(pageNumber != 1);
        paging.setPageNumber(pageNumber);

        // 如果总页数小于12
        if (totalPages < PAGINATION_STEP * 2 + 6) {
            paging.addPageItems(1, totalPages + 1, pageNumber);

            // 如果总页数大于12，而且是前6页
        } else if (pageNumber < PAGINATION_STEP * 2 + 1) {
            paging.addPageItems(1, PAGINATION_STEP * 2 + 4, pageNumber);
            paging.last(totalPages);

            // 如果总页数大于12，而且是后6页    
        } else if (pageNumber > totalPages - PAGINATION_STEP * 2) {
            paging.first(pageNumber);
            paging.addPageItems(totalPages - PAGINATION_STEP * 2 - 2, totalPages + 1, pageNumber);

            // 如果总页数大于12，而且不是前6页，也不是后6页    
        } else {
            paging.first(pageNumber);
            paging.addPageItems(pageNumber - PAGINATION_STEP, pageNumber + PAGINATION_STEP + 1, pageNumber);
            paging.last(totalPages);
        }

        return paging;
    }
}
